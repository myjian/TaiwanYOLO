/* MongoDB connection */
var mongoose = require('mongoose');
var Grid = require('gridfs');
var gfs;

var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/test';

module.exports.getGFS = function(){
	return gfs;
};

module.exports.init = function(callback){
	mongoose.connect(mongoURI);
	var conn = mongoose.connection;

	// Error handler
	conn.on('error', function(err){
		callback(err);
	});

	// Connection established
	conn.once('open', function(){
		console.log('database connection established at ' + mongoURI);
		gfs = Grid(conn.db, mongoose.mongo);
		require('./UserModel.js');
		require('./LocationModel.js');
		require('./RecordModel.js');
		require('./PhotoModel.js');
		callback();
	});
};
