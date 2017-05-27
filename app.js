var express = require('express')
var session = require('express-session')
cookieParser = require('cookie-parser')
bcrypt = require('bcryptjs')
csrf = require('csurf')
fs = require('fs')
path = require('path')
bodyParser = require('body-parser')
url = require('url')
shopify = require('shopify-buy')
nodemailer = require('nodemailer')
forms = require('mongoose-forms')
moment = require('moment')
var Form = forms.Form,
Bridge = forms.Bridge,
RedisStore = require('connect-redis')(session)
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var emailConf = require('./conf/email')

/// SET SESSION CONFIG
app.use(
	session({
		name: "myleisure.sid",
		secret: "4378vbh43o87gvb34wovb34o87gb4rybv3go43efgfg4gfg4fgboue78234ergfoh",
		resave: false,
		saveUninitialized: false,
		store: new RedisStore({
			host: 'localhost',
			port: 6379,
			ttl: 260
		})
	})
)

/// SET PERSISTENT LOGIN MIDDLEWARE AND FUNCTIONS
app.use(function(req, res, next) {
	if (req.session && req.session.user) {
		User.findOne({ username: req.session.user.username }, function(err, user) {
			if (user) {
				// req.user = user
				req.session.user = user
				delete req.session.user.password
				res.locals.user = req.session.user
			}
			next()
		})
	} else {
		next()
	}
})

function reqLog(req, res, next) {
	if(!req.session.user) {
		res.redirect('/login')
	} else {
		next()
	}
}

/// Routing
// app.use(router)
// app.use('/', routes.index && routes.CMS)

//// CSRF THINGS
// app.use(csrf())
// app.use(function(req, res, next) {
//
// 	var token = req.csrfToken()
// 	// es.cookie('XSFR-TOKEN', token)
// 	res.locals.csrfToken = token
// 	next()
//
// })

/// SET SITE WIDE VARIABLES
app.locals.site = "My Leisure"
app.locals.deploy = "local"
app.locals.siteurl = "/Home"
app.locals.title = "Sun Safe Sun Lounges | My Leisure Lettini's are revolutionizing beach experiences everywhere"
// "My Leisure | Lettinis, Italian made Sun Lounges"

///// Create Shopify Client
var shopifyClient = shopify.buildClient({
	accessToken: '30197388c16741334138de5dd1de3f1a',
	domain: 'my-leisure.myshopify.com',
	appId: '6'
})

///// SET BODY PARSER CONFIG
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//// SET VIEW ENGINE PUG/JADE
app.set('view engine', 'pug')
app.locals.basedir = path.join(__dirname, 'views')

/////// MONGODB AND MONGOOSE THINGS
var MongoClient = require('mongodb')
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
var db = mongoose.createConnection("mongodb://localhost:27017/myleisure")
var nodes = mongoose.createConnection("mongodb://localhost:27017/nodes")

// /////// LOAD ALL MODELS
var adminModels = require('./models/admin')
var	cmsModels = require('./models/CMS')
var blogModels = require('./models/CMS/blogs')
var	models = require('./models')


var nav = models.nav
var	description = models.description
var	colours = models.colours
var	finishes = models.finishes
var	product = models.products
var	User = adminModels.user
var	Blog = blogModels.blog

app.use(function(req, res, next) {
	nav.find({name: "main nav"}).exec().then(function(nav){
		res.locals.nav = nav[0]
		return true
	}).then(function(){
		// console.log(url.parse(req.url).pathname)
		res.locals.page = {}
		res.locals.page.url = url.parse(req.url).pathname
		if (res.locals.page.url.indexOf('/(|home|index|showcase|hotels|stockists|products/lettinis)$*')) {
			res.locals.page.navBackgroundColour = 'rgba(white,0)'
		} else {
			// console.log(true)
			res.locals.page.navBackgroundColour = "#1574c8"
		}

		next()

	})
})

////// FUNCTIONS AND GLOBAL VARIABLES
function search(prop, value, array) {
  for (var i=0; i < array.length; i++) {
		if (array[i][prop] === value) {
		  return array[i]
		}
  }
}

////// SET PROJECT PUBLIC FOLDERS
app.use(express.static('client'))
app.use('/styles', express.static(__dirname + '/styles'))
app.use('/js', express.static(__dirname + '/js'))
app.use('/img', express.static(__dirname + '/img'))



///// HOME / INDEX
app.get('/(|home|index)$*', function(req, res) {

  /// Gets all objects from mongodb before sending to jade pug
	res.locals.page = "home"
  var page = url.parse(req.url).pathname
	var objects = {}
  description.find({name: "Default"}).exec()
	  .then(function(description) {

		objects.description = description[0]

		return objects

	})
  .then(function(objects) {

	return finishes.find({name: "finishes"}).exec()
	  .then(function(finishes) {

		// objects.finishes = finishes[0].finishes
		res.locals.finishes = finishes[0].finishes
		res.locals.finishesTag = "in stock"
		return objects

	})

  })
	.then(function(objects){
		return product.then(function(model){
			return model.find({}).exec().then(function(products) {
				// if (!err) {
					frontPageProducts = [
						products[0],
						products[3],
						products[6]
					]
					// res.locals.frontPageProducts = frontPageProducts
					res.locals.product = products[Math.floor(Math.random()*products.length)]
					return objects
				// }
			})
		})
	})
  .then(function(objects){
		res.render('Home',
	  {
		description: objects.description.description,
	  }
	)

  })

})
app.get('/(|showcase|lettinis)$*', function(req, res) {

	res.locals.page = "showcase"
	product.then(function(model){
		model.find({}, function(err, products){
				res.locals.products = products
				console.log(products.length)

		}).exec()
		.then(function(){
			nav.find({name: "main nav"}, function(err, nav){
					res.locals.nav = nav[0]
					console.log(nav)
					res.render('Showcase')
				})
		})
	})
})
app.get('/commercial/apply*', function(req, res) {

	res.locals.page = "apply"
	nav.find({name: "main nav"}, function(err, nav) {
		res.locals.nav = nav[0]
	}).exec()
	.then(function(){
		res.render("Apply")

	})
})
///// ABOUT US
app.get('/aboutus*', function(req, res) {

	/// START app.get()

	/// Gets all objects from mongodb before sending to jade pug

	var page = url.parse(req.url).pathname
	nav.find({name: "main nav"}).exec()
	  .then(function(nav){

		var objects = {
		  nav: nav[0]
		}

		return objects

	}).then(function(objects) {

	  return description.find({name: "aboutus"}).exec()
		.then(function(description) {

		  objects.description = description[0]

		  return objects

	  })

	}).then(function(objects){

	  res.render('AboutUs',
		{
		  nav: objects.nav,
		  description: objects.description.description
		}
	  )

	})


	/// END app.get()

})
app.get('/cart', function(req, res) {

	res.render('Cart')

})
app.get('/termsandconditions*', function(req, res) {

	/// START app.get()

	/// Gets all objects from mongodb before sending to jade pug

	var page = url.parse(req.url).pathname
	nav.find({name: "main nav"}).exec()
	  .then(function(nav){

		var objects = {
		  nav: nav[0]
		}

		return objects

	}).then(function(objects) {

	  return description.find({name: "aboutus"}).exec()
		.then(function(description) {

		  objects.description = description[0]

		  return objects

	  })

	}).then(function(objects){

	  res.render('TermsAndConditions',
		{
		  nav: objects.nav,
		  description: objects.description.description
		}
	  )

	})


	/// END app.get()

})
///// CONTACT US
app.get('/contact*', function(req, res) {

	/// START app.get()

	/// Gets all objects from mongodb before sending to jade pug

	var page = url.parse(req.url).pathname
	nav.find({name: "main nav"}).exec()
	  .then(function(nav){

		var objects = {
		  nav: nav[0]
		}

		return objects

	}).then(function(objects) {

	  return description.find({name: "Default"}).exec()
		.then(function(description) {

		  objects.description = description[0]

		  return objects

	  })

	}).then(function(objects){

	  res.render('ContactUs',
		{
		  nav: objects.nav,
		  description: objects.description.description
		}
	  )

	})


	/// END app.get()

})
/////////// CONTACT US FORM HANDLER
app.post('/contact*', function(req, res) {

  var mailOpts, smtpTrans

  //Setup Nodemailer transport, I chose gmail. Create an routerlication-specific password to avoid problems.
  smtpTrans = nodemailer.createTransport({
	  service: 'Gmail',
	  auth: {
		  // xoauth2: xoauth2.createXOAuth2Generator({
			user: emailConf.email,
			pass: emailConf.password
		  // })
	  }
  })
  //Mail options
  mailOpts = {
	  from: req.body.name + ' &lt' + req.body.email + '&gt', //grab form data from the request body object
	  to: 'marietta@myleisure.com.au',
	  subject: 'Website contact form',
	  text: "Name: " + req.body.name + "\n Phone: " + req.body.phone + "\n Email: " + req.body.email + "\n" + req.body.message
  }

  console.log(req.body.name)

  smtpTrans.sendMail(mailOpts, function (error, response) {

	  if (error) {
		res.sendStatus(500)
	  } else {
		res.sendStatus(200)
	  }

  })

})
///// ACCESSORIES
app.get('/accessories*', function(req, res) {

	/// START app.get()

	/// Gets all objects from mongodb before sending to jade pug

	var page = url.parse(req.url).pathname
	nav.find({name: "main nav"}).exec()
	  .then(function(nav){

		var objects = {
		  nav: nav[0]
		}

		return objects

	}).then(function(objects) {

	  return description.find({name: "Default"}).exec()
		.then(function(description) {

		  objects.description = description[0]

		  return objects

	  })

	}).then(function(objects){

	  res.render('Accessories',
		{
		  nav: objects.nav,
		  description: objects.description.description
		}
	  )

	})


	/// END app.get()

})
///// CUSTOMIZE
app.get('/customize*', function(req, res) {

	/// START app.get()

	/// Gets all objects from mongodb before sending to jade pug

	var page = url.parse(req.url).pathname
	nav.find({name: "main nav"}).exec()
	  .then(function(nav){

		var objects = {
		  nav: nav[0]
		}

		return objects

	}).then(function(objects) {

	  return description.find({name: "Default"}).exec()
		.then(function(description) {

		  objects.description = description[0]

		  return objects

	  })

	}).then(function(objects){

	  res.render('Customize',
		{
		  nav: objects.nav,
		  description: objects.description.description
		}
	  )

	})


	/// END app.get()

})
///// DESIGN
app.get('/design*', function(req, res) {

	/// START app.get()

	/// Gets all objects from mongodb before sending to jade pug

	var page = url.parse(req.url).pathname
	nav.find({name: "main nav"}).exec()
	  .then(function(nav){

		var objects = {
		  nav: nav[0]
		}

		return objects

	})
	.then(function(objects) {

	  return description.find({name: "Default"}).exec()
		.then(function(description) {

		  objects.description = description[0]

		  return objects

	  })

	})
	.then(function(objects) {

	  return colours.find({name: "colours"}).exec()
		.then(function(colours) {

		  objects.colours = colours[0]

		  return objects

	  })

	})
	.then(function(objects) {

	  return shopifyClient.fetchProduct("8461073805")
		.then(function(product) {

		  objects.products = product

		  return objects
		})

	})
	.then(function(objects) {

	  return finishes.find({name: "finishes"}).exec()
		.then(function(finishes) {

		  objects.finishes = finishes[0].finishes

		  return objects

	  })

	})
	.then(function(objects) {
	  res.render('Design',
		{
		  nav: objects.nav,
		  description: objects.description.description,
		  colours: objects.colours,
		  products: objects.products.attrs,
		  typesOfColour: ['woven', 'gradient','square'],
		  finishes: objects.finishes,
		  finishesTag: "in stock"
		}
	  )

	})


	/// END app.get()

})
app.get('/possibilities*', function(req, res) {

	/// START app.get()

	/// Gets all objects from mongodb before sending to jade pug

	var page = url.parse(req.url).pathname
	nav.find({name: "main nav"}).exec()
	  .then(function(nav){

		var objects = {
		  nav: nav[0]
		}

		return objects

	})
	.then(function(objects) {

	  return description.find({name: "Default"}).exec()
		.then(function(description) {

		  objects.description = description[0]

		  return objects

	  })

	})
	.then(function(objects) {

	  return colours.find({name: "colours"}).exec()
		.then(function(colours) {

		  objects.colours = colours[0]

		  return objects

	  })

	})
	.then(function(objects) {

	  return finishes.find({name: "finishes"}).exec()
		.then(function(finishes) {

		  objects.finishes = finishes[0].finishes

		  return objects

	  })

	})
	.then(function(objects){

	  res.render('Possibilities',
			{
			  nav: objects.nav,
			  description: objects.description.description,
			  colours: objects.colours,
			  finishes: objects.finishes,
			  finishesTag: "all"
			}
	  )

	})


	/// END app.get()

})
///// SHOP/LETTINIS
app.get('/(|lettini|shop|products|products/lettinis|shop/lettinis)$*', function(req, res) {

	/// START app.get()

	/// Gets all objects from mongodb before sending to jade pug
	console.log('wtf')
	var page = url.parse(req.url).pathname
	nav.find({name: "main nav"}).exec()
	  .then(function(nav){

		var objects = {
		  nav: nav[0]
		}

		return objects

	})
	.then(function(objects) {

	  return description.find({name: "Default"}).exec()
		.then(function(description) {

		  objects.description = description[0]

		  return objects

	  })

	})
	.then(function(objects) {


	  return product.then(function(productModel){
		return  productModel.find({}).exec().then(function(products){
		  objects.products = products
		  return objects
		})
	  })
	})
	.then(function(objects) {

	  // console.log(objects.products)

	  res.render('Lettini',
		{
		  nav: objects.nav,
		  description: objects.description.description,
		  // colours: objects.colours,
		  // typesOfColour: ['woven', 'gradient','square'],
		  products: objects.products,
		  lettiniId: objects.products.id
		  // finishes: objects.finishes
		}
	  )

	})


	/// END app.get()

})
///// INDIVIDUAL LETTINI PRODUCT PAGES
app.get('/shop/lettinis/:sku*', function(req, res) {

  var sku = req.params.sku

  product.then(function(product){
	return product.find({sku: sku}).exec().then(function(product){
	  var objects = {
		product: product[0]
	  }

	  return objects
	})
  })
  .then(function(objects){
	return nav.find({name: "main nav"}).exec().then(function(nav){
	  objects.nav = nav[0]

	  return objects
	})
  })
  .then(function(objects){
	return description.find({name: "default"}).exec().then(function(description){
	  objects.description = description.description

	  return objects
	})
  })
  .then(function(objects){


	if (objects.product.id.length > 0) {

	  res.render("Product", {
		nav: objects.nav,
		product: objects.product,
		description: objects.description,



	  })

	} else {
	  res.send('nah uh')
	}

  })
  .catch(function(objects){

	res.render("404")

  })

})
//// SHIPPING PAGE
app.get('/shipping?:sku*', function(req, res) {

  /// START app.get()

  /// Gets all objects from mongodb before sending to jade pug

  var page = url.parse(req.url).pathname
  nav.find({name: "main nav"}).exec()
	.then(function(nav){

	  var objects = {
		nav: nav[0]
	  }

	  return objects

  })
	.then(function(objects) {
		return product.find({sku: req.params.sku}).exec()
			.then(function(product) {
				objects.product = product
				return objects
			})
	})
	.then(function(objects) {

		return description.find({name: "Default"}).exec()
	  .then(function(description) {

		objects.description = description[0]

		return objects

	})

  })
  .then(function(objects){

	res.render('Shipping',
	  {
		nav: objects.nav,
		description: objects.description.description,
		product: objects.product
	  }
	)

  })


  /// END app.get()

})
app.get('/stockists', function(req, res) {

	nav.find({name: "main nav"}).then(function(nav){
		res.locals.nav = nav[0]
	}).then(function(){
		res.render('Stockists')
	})

})
app.post('/stockists', function(req, res) {

  var mailOpts, smtpTrans

  //Setup Nodemailer transport, I chose gmail. Create an routerlication-specific password to avoid problems.
  smtpTrans = nodemailer.createTransport({
	  service: 'Gmail',
	  auth: {
		  // xoauth2: xoauth2.createXOAuth2Generator({
			user: "ireply@myleisure.com.au",
			pass: "myleisure"
		  // })
	  }
  })
  //Mail options
	console.log(req.body.email)
  mailOpts = {
	  from: req.body.email, //grab form data from the request body object
	  to: 'marietta@myleisure.com.au',
	  subject: 'Stockist interest form',
	  text: "Welcome to the My Leisure Stockists application process, we'd love to have you on board"+"\nEmail: "+req.body.email
  }

  smtpTrans.sendMail(mailOpts, function (error, response) {

	  if (error) {
		res.sendStatus(500)
	  } else {
		res.sendStatus(200)
	  }

  })

})
app.get('/hotels', function(req, res) {

	nav.find({name: "main nav"}).then(function(nav){
		res.locals.nav = nav[0]
	}).then(function(){
		res.render('Hotels')
	})

})
app.get('/build', function(req, res) {
	res.locals.choices = [
		{
			frame: "Silver",
			frameText: "silver",
			colours: []
		},
		{
			frame: "White",
			frameText: "white",
			colours: []
		},
		{
			frame: "Bronze",
			frameText: "bronze",
			colours: []
		}
	]
	var frames = []
	product.then(function(product){
		product.find({}).exec().then(function(products){
			for(i=0;i<products.length;i++){
				for(j=0;j<res.locals.choices.length;j++){
					if(res.locals.choices[j].colours.indexOf(products[i].colour) < 0){
						if(products[i].finish == res.locals.choices[j].frame){
							res.locals.choices[j].colours.push(products[i].colour)
						}
					}
				}
				if(i==products.length-1){
					return
				}
			}
		}).then(function(){
			nav.find({name: "main nav"}).exec().then(function(nav) {
				res.locals.nav = nav[0]
				return true
			})
			.then(function(){

				res.render('Builder')
			})
		})

	})


})
app.get('/blogs(|/:blogTitle)', function(req, res) {

	res.locals.page = 'blog'
	product.then(function(model){
		model.find({}).exec().then(function(products) {
			// if (!err) {
				frontPageProducts = [
					products[0],
					products[3],
					products[6]
				]
				// res.locals.frontPageProducts = frontPageProducts
				res.locals.product = products[Math.floor(Math.random()*products.length)]
				console.log(req.params.blogTitle)
				if (req.params.blogTitle) {
					res.locals.blog = req.params.blogTitle
					res.render('CMS/blogs/blog-'+req.params.blogTitle)

				} else {
					res.locals.blog = "our-first-blog"
					res.redirect('/blogs/are-you-really-protected')
				}
			// }
		})
	})
})
app.post('/build?:frame', function(req, res) {
	res.locals.frame = req.params.frame

})
//// LOGIN AND REGISTRATION AND DASHBOARD
app.get('/login*', function(req, res) {
	if (req.session && req.session.user) {
		User.findOne({username: req.session.user.username}, function(err, user) {
			if (!user) {
				req.session.destroy()
				res.render('snippets/admin/login')
			} else {
				console.log("app.get /login req.session.user")
				console.log(req.session.user)
				res.locals.user = req.session.user
				res.redirect('/Dashboard')
			}
		})
	} else {
		res.render('snippets/admin/login')
	}
})
app.post('/login', function(req, res) {

	// console.log(req.session)
	console.log("app.post('/login req.session')")
	console.log(req.session)

	User.findOne({$or: [
		{username: req.body.username },
		{email: req.body.username}
	]}, function(err, user) {
		if(err){
			res.send(err)
		} else if (!user) {
			res.render('snippets/admin/login', {
				error: "You are not in our system, please <a href='/register'>register</a> to login"
			})
		} else if (bcrypt.compareSync(req.body.password, user.password)) {
			req.session.user = user
			delete req.session.user.password
			res.locals.user = req.user
			res.redirect("/dashboard")
		} else {
			res.locals.error = "Your password was incorrect"
			res.render('snippets/admin/login')
		}
	})
})
app.get("/dashboard", reqLog, function(req, res) {
	Blog.find({'editors': req.session.user.username}, function(err, blogs) {
		res.locals.blogCount = blogs.length
		res.locals.blogs = blogs
		return true
	}).exec().then(function(){
		product.then(function(productModel){
			productModel.find({}, function(err, products) {
				res.locals.products = products
				res.locals.productCount = products.length
				res.render('CMS/dashboard')
			})
		})
	})
})
app.post('/dashboard', reqLog, function(req, res) {
	Blog.findById(req.body.blogId, function(err, blog){
		res.locals.blog = blog
	}).then(function(){
		res.locals.form = Form(res.locals.blog)
	}).then(function(){
		var blogForm = Bridge(res.locals.blog, res.locals.form).getForm()
		res.status(200).send(res.locals)

	})
})
app.get("/admin", reqLog, function(req, res) {

	res.redirect('/Dashboard')

})
app.get('/register*', function(req, res) {

	if(req.session && req.session.user) {
		User.findOne({ username : req.session.user.username}, function(err, user) {
			if (!user) {
				req.session.destroy()
				res.render('snippets/admin/register')
			} else {
				res.locals.user = req.session.user
				res.redirect('/Dashboard')
			}
		})
	} else {
		res.render('snippets/admin/register')
	}

})
app.post('/register', function(req, res) {
	if (req.body.password === req.body.confirmPassword) {
		var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12))
		var newUser = new User({
			firstName: req.body.firstName.toLowerCase(),
			lastName: req.body.lastName.toLowerCase(),
			username: req.body.username,
			password: hash,
			email: req.body.email.toLowerCase(),
			luckyNumber: req.body.luck
		})
		newUser.save(function(err){
			if(err){
				var error = "Something bad happened :O" + err
				if(err.code === 11000){
					res.locals.error = "The email or username you specified is already in use, please try another"
				}
				res.render('snippets/admin/register')
			} else {
				req.session.user = newUser
				delete req.session.user.password
				res.locals.user = req.session.user
				res.redirect('/Dashboard')
			}
		})
	} else {
		res.locals.error = "Your passwords did not match"
		res.render('snippets/admin/register')
	}
})
app.get("/logout", function(req, res) {
	req.session.destroy()
	res.redirect('/')
})

/// TEMPLATING FUNCTIONS
var blogTemplatePath = 'CMS/blogs/blogTemplate'
var blogTemplateFormPath = 'CMS/blogs/blogTemplateEditable'
// var fillBlogTemplate = new Promise(function(blog){
//
// 	return app.render(blogTemplatePath,{blog: blog},function(err, html){
// 		console.log(err);
// 		console.log(html);
// 		return html
// 	})
// })
/// SOCKET.IO STUFF

var connections = []
io.on('connection', function(socket){
	connections.push(socket);
	console.log("new connection, connections: "+connections.length);
	socket.on('disconnect', function(data){
		connections.splice(connections.indexOf(socket), 1)
		console.log("lost connection, connections: "+connections.length);
	})

	/// SOCKET EVENT HANDLERS

	/// HANDLES AN EDIT BLOG REQUEST FROM CLIENT
	socket.on('edit blog', function(blogId){
		var res = {};
		Blog.findById(blogId).then(function(blog){
			res.form = Form(blog)
			res.filledForm = Bridge(blog, res.form).getForm()
			delete res.form
			app.render(blogTemplateFormPath,{blog: blog}, function(err, html){
				console.log(err);
				console.log(html);
				socket.emit('blog form', html)
			})

		})
	})

/// CLOSING BRACKET FOR IO.ON('CONNECTION')
})

app.get('/test', function(req, res){
	Blog.findById('58fcd81ce343396940487b39', function(err, blog){
		res.locals.blog = blog
	}).then(function(){
		res.render('CMS/blogs/blogTemplate')
	})
})

/// 404 HANDLERS
app.get('*', function(req, res){
	res.render("404")
})

//// APP LISTENER FOR CLIENTS
// app.listen(3002)
http.listen(3002, () => console.log('listening on 3002'))
