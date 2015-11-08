var express = require('express');
var router = express.Router();
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var config = require('../config');
var facebookRoutes = require('./facebook');
var UserModel = require('../models/UserModel');

// Passport-Facebook
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new FacebookStrategy({
        clientID: config.facebook_api.id,
        clientSecret: config.facebook_api.secret,
        callbackURL: '/auth/facebook/callback'
    },
	function (accessToken, refreshToken, profile, done) {
		console.log(profile);
		var info = {
			facebookId: profile.id,
			name: profile.displayName,
			email: profile.email
		};
		UserModel.findOrCreate(info, function(err, user) {
			console.log(err);
			console.log(user);
			return done(err, user);
		});
	}
));





/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Uncharted' });
});

router.get('/auth/facebook', facebookRoutes.login);

router.get('/auth/facebook/callback',
		passport.authenticate('facebook', { failureRedirect: '/' }),
		facebookRoutes.succeed);

router.get('/auth/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

router.get('/api/me', function(req, res) {
    if (!req.user){
		return res.send('<a href="/auth/facebook">Log in</a>');
    }
	console.log(req.user);
    res.json(req.user);
});

router.get('/explore', function(req, res, next) {
  res.render('explore', { title: 'Express' });
});




router.get('/explore', function(req, res, next) {
  res.render('explore', { title: 'Express' });
});





var ifSignIn = function (req, res, next) {
//	if (req.session && req.session.user) { 
//		console.log('~~~~~~~~~~~~~~~ Session exist!!!');
		next();
//	}else{
//		res.redirect('/signin');
//	}  
}

module.exports = router;
