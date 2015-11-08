/* Location Schema */
var mongoose = require('mongoose');

var LocationSchema = new mongoose.Schema({
	latitude: {type: Number, required: true},
	longitude: {type: Number, required: true},
	country: {type: String, default: ''},
	city: {type: String, default: ''}
});

var Location = mongoose.model('Location', LocationSchema);

module.exports.add = function(info, callback) {
	var location = new Location(info);
	location.save(function(err) {
		if (err) return callback(err);
		return callback();
	});
};

module.exports.findOne = function(info, callback) {
	Location.findOne(info, function(err, row) {
		if (err) return callback(err);
		callback(false, row);
	});
};

module.exports.find = function(info, callback) {
	Location.find(info, function(err, rows) {
		if (err) return callback(err);
		callback(false, rows);
	});
};

module.exports.remove = function(info, callback) {
	Location.remove(info, function(err) {
		if (err) return callback(err);
		return callback();
	});
};
