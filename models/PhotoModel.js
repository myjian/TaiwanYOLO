/* Photo Schema */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DBinit = require('./DBinit');

var PhotoSchema = new Schema({
	record_id: {type: Schema.Types.ObjectId, ref: 'Record'},
	date_posted: {type: Date, required: true},
	caption: {type: String, default: ''},
});

var Photo = mongoose.model('Photo', PhotoSchema);

module.exports.add = function(info, content, callback) {
	var photo = new Photo(info);
	photo.save(function(err){
		if (err) return callback(err);
		Photo.findById(photo, function(err, row) {
			if (err) return callback(err);
			var options = {
				filename: row._id
			};
			var gfs = DBinit.getGFS();
			gfs.writeFile(options, content, function(err, file){
				if (err) return callback(err);
				return callback();
			});
		});
	});
};

module.exports.findOne = function(info, callback) {
	Photo.findOne(info, function(err, row) {
		if (err) return callback(err);
		var options = {
			filename: row._id
		};
		var gfs = DBinit.getGFS();
		gfs.readFile(options, function(err, file){
			if (err) return callback(err);
			row.content = file;
			return callback(false, row);
		});
	});
};

module.exports.getPhoto = function(id, callback) {
	var options = {
		filename: id
	};
	var gfs = DBinit.getGFS();
	gfs.readFile(options, function(err, file){
		if (err) return callback(err);
		return callback(false, file);
	});
};

module.exports.find = function(info, callback) {
	Photo.find(info, function(err, rows) {
		if (err) return callback(err);
		callback(false, rows);
	});
};

module.exports.remove = function(info, callback) {
	Photo.remove(info, function(err) {
		if (err) return callback(err);
		return callback();
	});
};
