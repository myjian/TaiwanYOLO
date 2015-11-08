var express = require('express');
var router = express.Router();





/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
