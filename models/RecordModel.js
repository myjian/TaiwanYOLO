/* Record Schema */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecordSchema = new Schema({
	location_id: {type: Schema.Types.ObjectId, ref: 'Location'},
	user_id: {type: Schema.Types.ObjectId, ref: 'User'},
	tags: [ {type: String} ],
	date_posted: {type: Date, required: true},
	date_updated: {type: Date},
	date_reviewed: {type: Date},
	vote_up: {type: Number, default: 0},
	vote_down: {type: Number, default: 0},
});

var Record = mongoose.model('Record', RecordSchema);

module.exports.add = function(info, callback) {
	var record = new Record(info);
	record.save(function(err) {
		if (err) return callback(err);
		return callback();
	});
};

module.exports.findOne = function(info, callback) {
	Record.findOne(info, function(err, row) {
		if (err) return callback(err);
		callback(false, row);
	});
};

module.exports.find = function(info, callback) {
	Record.find(info, function(err, rows) {
		if (err) return callback(err);
		callback(false, rows);
	});
};

module.exports.remove = function(info, callback) {
	Record.remove(info, function(err) {
		if (err) return callback(err);
		return callback();
	});
};
