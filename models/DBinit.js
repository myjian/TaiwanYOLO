/* MongoDB connection */
var mongoose = require('mongoose');
var Grid = require('gridfs');
var gfs;

var mongo = process.env.VCAP_SERVICES;
var mongoURI = "";
if (mongo) {
	var env = JSON.parse(mongo);
	if (env['mongodb-2.4']) {
		mongo = env['mongodb-2.4'][0]['credentials'];
		if (mongo.url) {
			mongoURI = mongo.url;
		} else {
			console.log("No mongo found");
		}  
	} else {
		mongoURI = 'mongodb://localhost:27017';
	}
} else {
	mongoURI = 'mongodb://localhost:27017';
}

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
