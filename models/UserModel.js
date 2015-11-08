/* User Schema */
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	facebookId: { type: String },
	name: { type: String, required: true },
	email: { type: String }
});

var User = mongoose.model('User', UserSchema);

module.exports.add = function(info, callback) {
	var user = new User(info);
	user.save(function(err) {
		if (err) return callback(err);
		callback();
	});
};

module.exports.findOrCreate = function(info, callback) {
	var filter = { email: info.email };
	User.findOne(filter, function(err, row) {
		if (err) return callback(err);
		if (row) return callback(false, row);
		var user = new User(info);
		user.save(function(err, row) {
			if (err) return callback(err);
			callback(false, row);
		});
	});
};

module.exports.findOne = function(info, callback) {
	User.findOne(info, function(err, row) {
		if (err) return callback(err);
		callback(false, row);
	});
};

module.exports.find = function(info, callback) {
	User.find(info, function(err, rows) {
		if (err) return callback(err);
		callback(false, rows);
	});
};

module.exports.remove = function(info, callback) {
	User.remove(info, function(err) {
		if (err) return callback(err);
		return callback();
	});
};
