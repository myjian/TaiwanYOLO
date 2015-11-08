var express = require('express');
var router = express.Router();
var PhotoModel = require('../models/PhotoModel');

router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.get('/:id', function(req, res, next) {
	res.render('discover_show', { title: 'Express' });
});

module.exports = router;
