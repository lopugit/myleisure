
var express = require('express');
var router = express.Router(),
path = require('path'),
fs = require('fs');

router.get('/login', function(req, res) {
	if (req.session && req.session.user) {
		User.findOne({username: req.session.user.username}, function(err, user) {
			if (!user) {
				req.session.destroy();
				res.render('snippets/admin/login');
			} else {
				console.log("router.get /login req.session.user");
				console.log(req.session.user);
				res.locals.user = req.session.user;
				res.redirect('/Dashboard');
			}
		})
	} else {
		res.render('snippets/admin/login')
	}
});

router.post('/login', function(req, res) {

	// console.log(req.session);
	console.log("router.post('/login req.session')");
	console.log(req.session);

	User.findOne({$or: [
		{username: req.body.username },
		{email: req.body.username}
	]}, function(err, user) {
		if(err){
			res.send(err);
		} else if (!user) {
			res.render('snippets/admin/login', {
				error: "You are not in our system, please <a href='/register'>register</a> to login"
			});
		} else if (bcrypt.compareSync(req.body.password, user.password)) {
			req.session.user = user;
			delete req.session.user.password;
			res.locals.user = req.user;
			res.redirect("/dashboard");
		} else {
			res.locals.error = "Your password was incorrect";
			res.render('snippets/admin/login');
		}
	});
});


router.get("/dashboard", reqLog, function(req, res) {

	res.render('CMS/dashboard');

});

router.get("/admin", reqLog, function(req, res) {

	res.redirect('/Dashboard');

});


router.get('/register', function(req, res) {

	if(req.session && req.session.user) {
		User.findOne({ username : req.session.user.username}, function(err, user) {
			if (!user) {
				req.session.destroy();
				res.render('snippets/admin/register');
			} else {
				res.locals.user = req.session.user;
				res.redirect('/Dashboard');
			}
		})
	} else {
		res.render('snippets/admin/register');
	}

});

router.post('/register', function(req, res) {


	if (req.body.password === req.body.confirmPassword) {

		var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12));

		var newUser = new User({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			username: req.body.username,
			password: hash,
			email: req.body.email,
			luckyNumber: req.body.luckyNumber
		});

		newUser.save(function(err){
			if(err){
				var error = "Something bad hrouterened :O" + err;

				if(err.code === 11000){
					res.locals.error = "The email or username you specified is already in use, please try another";
				}

				res.render('snippets/admin/register');
			} else {
				req.session.user = newUser;
				delete req.session.user.password;
				res.locals.user = req.session.user;
				res.redirect('/Dashboard')
			}
		})
	} else {
		res.locals.error = "Your passwords did not match";
		res.render('snippets/admin/register');
	}

});



router.get("/logout", function(req, res) {
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;
