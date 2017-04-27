
var express = require('express');
var router = express.Router(),
path = require('path'),
fs = require('fs');

///// HOME / INDEX
router.get('/(|home|index)$', function(req,res){

  /// START router.get()

  /// Gets all objects from mongodb before sending to jade pug

  var page = url.parse(req.url).pathname;
  nav.find({name: "main nav"}).exec()
	.then(function(nav){

	  var objects = {
		nav: nav[0]
	  };

	  return objects;

  }).then(function(objects) {

	return description.find({name: "Default"}).exec()
	  .then(function(description) {

		objects.description = description[0];

		return objects;

	});

  })
  .then(function(objects) {

	return finishes.find({name: "finishes"}).exec()
	  .then(function(finishes) {

		objects.finishes = finishes[0].finishes;

		return objects;

	});

  })
  .then(function(objects){

	res.render('Home',
	  {
		nav: objects.nav,
		title: "My Leisure | Lettinis, Italian made Sun Lounges",
		description: objects.description.description,
		finishes: objects.finishes,
		finishesTag: "in stock"
	  }
	);

  });


  /// END router.get()

});


///// ABOUT US
router.get('/aboutus', function(req, res) {

	/// START router.get()

	/// Gets all objects from mongodb before sending to jade pug

	var page = url.parse(req.url).pathname;
	nav.find({name: "main nav"}).exec()
	  .then(function(nav){

		var objects = {
		  nav: nav[0]
		};

		return objects;

	}).then(function(objects) {

	  return description.find({name: "aboutus"}).exec()
		.then(function(description) {

		  objects.description = description[0];

		  return objects;

	  });

	}).then(function(objects){

	  res.render('AboutUs',
		{
		  nav: objects.nav,
		  title: "My Leisure | Lettinis, Italian made Sun Lounges",
		  description: objects.description.description
		}
	  );

	});


	/// END router.get()

});


///// CONTACT US
router.get('/contactus', function(req, res) {

	/// START router.get()

	/// Gets all objects from mongodb before sending to jade pug

	var page = url.parse(req.url).pathname;
	nav.find({name: "main nav"}).exec()
	  .then(function(nav){

		var objects = {
		  nav: nav[0]
		};

		return objects;

	}).then(function(objects) {

	  return description.find({name: "Default"}).exec()
		.then(function(description) {

		  objects.description = description[0];

		  return objects;

	  });

	}).then(function(objects){

	  res.render('ContactUs',
		{
		  nav: objects.nav,
		  title: "My Leisure | Lettinis, Italian made Sun Lounges Contact Us",
		  description: objects.description.description
		}
	  );

	});


	/// END router.get()

});
/////////// CONTACT US FORM HANDLER
router.post('/contactus', function(req, res) {

  var mailOpts, smtpTrans;

  //Setup Nodemailer transport, I chose gmail. Create an routerlication-specific password to avoid problems.
  smtpTrans = nodemailer.createTransport({
	  service: 'Gmail',
	  auth: {
		  // xoauth2: xoauth2.createXOAuth2Generator({
			user: "ireply@myleisure.com.au",
			pass: "myleisure"
		  // })
	  }
  });
  //Mail options
  mailOpts = {
	  from: req.body.name + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
	  to: 'marietta@myleisure.com.au',
	  subject: 'Website contact form',
	  text: "Name: " + req.body.name + "\n Phone: " + req.body.phone + "\n" + req.body.message
  };

  console.log(req.body.name);

  smtpTrans.sendMail(mailOpts, function (error, response) {

	  if (error) {
		res.sendStatus(500);
	  } else {
		res.sendStatus(200);
	  };

  });

});


///// ACCESSORIES
router.get('/accessories', function(req, res) {

	/// START router.get()

	/// Gets all objects from mongodb before sending to jade pug

	var page = url.parse(req.url).pathname;
	nav.find({name: "main nav"}).exec()
	  .then(function(nav){

		var objects = {
		  nav: nav[0]
		};

		return objects;

	}).then(function(objects) {

	  return description.find({name: "Default"}).exec()
		.then(function(description) {

		  objects.description = description[0];

		  return objects;

	  });

	}).then(function(objects){

	  res.render('Accessories',
		{
		  nav: objects.nav,
		  title: "My Leisure | Lettinis, Italian made Sun Lounges Contact Us",
		  description: objects.description.description
		}
	  );

	});


	/// END router.get()

});


///// CUSTOMIZE
router.get('/customize', function(req, res) {

	/// START router.get()

	/// Gets all objects from mongodb before sending to jade pug

	var page = url.parse(req.url).pathname;
	nav.find({name: "main nav"}).exec()
	  .then(function(nav){

		var objects = {
		  nav: nav[0]
		};

		return objects;

	}).then(function(objects) {

	  return description.find({name: "Default"}).exec()
		.then(function(description) {

		  objects.description = description[0];

		  return objects;

	  });

	}).then(function(objects){

	  res.render('Customize',
		{
		  nav: objects.nav,
		  title: "My Leisure | Lettinis, Italian made Sun Lounges Contact Us",
		  description: objects.description.description
		}
	  );

	});


	/// END router.get()

});


///// DESIGN
router.get('/design', function(req, res) {

	/// START router.get()

	/// Gets all objects from mongodb before sending to jade pug

	var page = url.parse(req.url).pathname;
	nav.find({name: "main nav"}).exec()
	  .then(function(nav){

		var objects = {
		  nav: nav[0]
		};

		return objects;

	})
	.then(function(objects) {

	  return description.find({name: "Default"}).exec()
		.then(function(description) {

		  objects.description = description[0];

		  return objects;

	  });

	})
	.then(function(objects) {

	  return colours.find({name: "colours"}).exec()
		.then(function(colours) {

		  objects.colours = colours[0];

		  return objects;

	  });

	})
	.then(function(objects) {

	  return shopifyClient.fetchProduct("8461073805")
		.then(function(product) {

		  objects.products = product;

		  return objects
		});

	})
	.then(function(objects) {

	  return finishes.find({name: "finishes"}).exec()
		.then(function(finishes) {

		  objects.finishes = finishes[0].finishes;

		  return objects;

	  });

	})
	.then(function(objects) {
	  res.render('Design',
		{
		  nav: objects.nav,
		  title: "My Leisure | Lettinis, Italian made Sun Lounges Contact Us",
		  description: objects.description.description,
		  colours: objects.colours,
		  products: objects.products.attrs,
		  typesOfColour: ['woven', 'gradient','square'],
		  finishes: objects.finishes,
		  finishesTag: "in stock"
		}
	  );

	});


	/// END router.get()

});


///// ABOUT US
router.get('/possibilities', function(req, res) {

	/// START router.get()

	/// Gets all objects from mongodb before sending to jade pug

	var page = url.parse(req.url).pathname;
	nav.find({name: "main nav"}).exec()
	  .then(function(nav){

		var objects = {
		  nav: nav[0]
		};

		return objects;

	})
	.then(function(objects) {

	  return description.find({name: "Default"}).exec()
		.then(function(description) {

		  objects.description = description[0];

		  return objects;

	  });

	})
	.then(function(objects) {

	  return colours.find({name: "colours"}).exec()
		.then(function(colours) {

		  objects.colours = colours[0];

		  return objects;

	  });

	})
	.then(function(objects) {

	  return finishes.find({name: "finishes"}).exec()
		.then(function(finishes) {

		  objects.finishes = finishes[0].finishes;

		  return objects;

	  });

	})
	.then(function(objects){

	  res.render('Possibilities',
			{
			  nav: objects.nav,
			  title: "My Leisure | Lettinis, Italian made Sun Lounges Contact Us",
			  description: objects.description.description,
			  colours: objects.colours,
			  finishes: objects.finishes,
			  finishesTag: "all"
			}
	  );

	});


	/// END router.get()

});

///// SHOP/LETTINIS
router.get('/(|lettini|shop|products)', function(req, res) {

	/// START router.get()

	/// Gets all objects from mongodb before sending to jade pug

	var page = url.parse(req.url).pathname;
	nav.find({name: "main nav"}).exec()
	  .then(function(nav){

		var objects = {
		  nav: nav[0]
		};

		return objects;

	})
	.then(function(objects) {

	  return description.find({name: "Default"}).exec()
		.then(function(description) {

		  objects.description = description[0];

		  return objects;

	  });

	})
	.then(function(objects) {


	  return product.then(function(productModel){
		return  productModel.find({}).exec().then(function(products){
		  objects.products = products;
		  return objects
		});
	  });
	})
	.then(function(objects) {

	  // console.log(objects.products);

	  res.render('Lettini',
		{
		  nav: objects.nav,
		  title: "My Leisure | Lettinis, Italian made Sun Lounges Contact Us",
		  description: objects.description.description,
		  // colours: objects.colours,
		  // typesOfColour: ['woven', 'gradient','square'],
		  products: objects.products,
		  lettiniId: objects.products.id
		  // finishes: objects.finishes
		}
	  );

	});


	/// END router.get()

});


///// LETTINI PRODUCT PAGES
router.get('/shop/lettinis/:sku', function(req, res) {

  var sku = req.params.sku;

  product.then(function(product){
	return product.find({sku: sku}).exec().then(function(product){
	  var objects = {
		product: product[0]
	  };

	  return objects;
	});
  })
  .then(function(objects){
	return nav.find({name: "main nav"}).exec().then(function(nav){
	  objects.nav = nav[0];

	  return objects
	});
  })
  .then(function(objects){
	return description.find({name: "default"}).exec().then(function(description){
	  objects.description = description.description;

	  return objects
	});
  })
  .then(function(objects){


	if (objects.product.id.length > 0) {

	  res.render("Product", {
		nav: objects.nav,
		product: objects.product,
		description: objects.description,
		title: objects.product.colour + " " + objects.product.finish + " Lettini Sun lounge with canopy"



	  })

	} else {
	  res.send('nah uh')
	}

  })
  .catch(function(objects){

	res.render("404");

  })

});


//// SHIPPING PAGE
router.get('/shipping?:sku', function(req,res){

  /// START router.get()

  /// Gets all objects from mongodb before sending to jade pug

  var page = url.parse(req.url).pathname;
  nav.find({name: "main nav"}).exec()
	.then(function(nav){

	  var objects = {
		nav: nav[0]
	  };

	  return objects;

  })
	.then(function(objects) {
		return product.find({sku: req.params.sku}).exec()
			.then(function(product) {
				objects.product = product;
				return objects
			})
	})
	.then(function(objects) {

	return description.find({name: "Default"}).exec()
	  .then(function(description) {

		objects.description = description[0];

		return objects;

	});

  })
  .then(function(objects){

	res.render('Shipping',
	  {
		nav: objects.nav,
		title: "Our shipping fees My Leisure | Lettinis, Italian made Sun Lounges",
		description: objects.description.description,
		product: objects.product
	  }
	);

  });


  /// END router.get()

});

module.exports = router;
