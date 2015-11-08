var modelPath = '../../models/';
var DBinit = require(modelPath + 'DBinit');
var UserModel = require(modelPath + 'UserModel');
var LocationModel = require(modelPath + 'LocationModel');
var RecordModel = require(modelPath + 'RecordModel');
var PhotoModel = require(modelPath + 'PhotoModel');
var assert = require('chai').assert;

var user1 = { name: "myjian", email: "myjian.tw@gmail.com" };
var user1filter = { name: "myjian" };
var user1entry;

var location1 = { latitude: 37.93851, longitude: -122.589283, country: 'United States', city: 'CA' };
var location1filter = { latitude: 37.93851, longitude: -122.589283 };
var location1entry;

var record1 = {
	tags: ["miku"],
	date_posted: new Date(),
	vote_up: 3,
	vote_down: 1
};
var record1filter = {
	tags: ["miku"]
};
var record1entry;

var imgContent = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAAJYCAYAAACadoJwAAAVUUlEQVR4nO3dT2jcdf7H8dhYa4U1YruRwnYLylYPLtRAPBjtsofd7kbj0iTb2gba7aEirAqr7U1sTgZaTwUP4kEMMnsTJAdlD8XNrQeLZZAehLoLC3YuxYsgtvL+HX4/5aeTP3WNr29n5vGAzyGQwyuTHL5PPjNkqAAAAEKGmh4AAAAMDgECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIgRIAAAQIwAAQAAYgQIAAAQI0AAAIAYAQIAAMQIEAAAIEaAAAAAMQIEAACIESAAAECMAAEAAGIECAAAECNAAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIgRIAAAQIwAAQAAYgQIAAAQI0AAAIAYAQIAAMQIEAAAIEaAAAAAMQIEAACIESAAAECMAAEAAGIECAAAECNAAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIgRIAAAQIwAAQAAYgQIAAAQI0AAAIAYAQIAAMQIEAAAIEaAAAAAMQIEAACIESAAAECMAAEAAGIECAAAECNAAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIgRIAAAQIwAAQAAYgQIAAAQI0AAAIAYAQIAAMQIEAAAIEaAAAAAMQIEAACIESAAAECMAAEAAGIECAAAECNAAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIgRIAAAQIwAAQAAYgQIAAAQI0AAAIAYAQIAAMQIEAAAIEaAAAAAMQIEAACIESAAAECMAAEAAGIECAAAECNAAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIgRIAAAQIwAAQAAYgQIAAAQI0AAAIAYAQIAAMQIEAAAIEaAAAAAMQIEAACIESAAAECMAAEAAGIECAAAECNAAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIgRIAAAQIwAAQAAYgQIAAAQI0AAAIAYAQIAAMQIEAAAIEaAAAAAMQIEAACIESAAAECMAAEAAGIECAAAECNAAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIgRIAAAQIwAAQAAYgQIAAAQI0AAAIAYAQIAAMQIEAAAIEaAAAAAMQIEAACIESAAAECMAAEAAGIECAAAECNAAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIgRIAAAQIwAAQAAYgQIAAAQI0AAAIAYAQIAAMQIEAAAIEaAAAAAMQIEAACIESAAAECMAAEAAGIECAAAECNAAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIgRIAAAQIwAAQAAYgQIAAAQI0AAAIAYAQIAAMQIEAAAIEaAAAAAMQIEAACIESAAAECMAAEAAGIECAAAECNAAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIgRIAAAQIwAAQAAYgQIAAAQI0AAAIAYAQIAAMQIEAAAIEaAAAAAMQIEAACIESAAAECMAAEAAGIECAAAECNAAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIgRIAAAQIwAAQAAYgQIAAAQI0AAAIAYAQIAAMQIEAAAIEaAAAAAMQIEAACIESAAAECMAAEAAGIECAAAECNAAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIgRIAAAQIwAAQAAYgQIAAAQI0AAAIAYAQIAAMQIEAAAIEaAAAAAMQIEAACIESAAAECMAAEAAGIECAAAECNAAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIgRIAAAQIwAAQAAYgQIAAAQI0AAAIAYAQIAAMQIEAAAIEaAAAAAMQIEAACIESAAAECMAAEAAGIECAAAECNAAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIgRIAAAQIwAAQAAYgQIAAAQI0AAAIAYAQIAAMQIEAAAIEaAAAAAMQIEAACIESAAAECMAAEAAGIECAAAECNAAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIgRIAAAQIwAAQAAYgQIAAAQI0AAAIAYAQIAAMQIEAAAIEaAAAAAMQIEAACIESAAAECMAAEAAGIECAAAECNAAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIgRIAAAQIwAAQAAYgQIAAAQI0AAAIAYAQIAAMQIEAAAIEaAAAAAMQIEAACIESAAAECMAAEAAGIECAAAECNAAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABYMN9/fXXdfXq1fr000/r4sWLtby8XEtLS/X222/Xa6+9VgcPHqyDBw/W/Pz8hp1Tp07VwYMH66mnnqo33nij3nnnnVpeXq6PP/64Op1OXb9+vemXBYASIACs49q1a3X58uVaXl6uVqtVBw4cqOnp6Tp+/HgdOnSoJicna2Jioh588MHauXNn3XnnnTU0NHRTnm3bttXu3bvrkUceqampqTp27FidOHGiFhYWRAtAiAABGGDfj4vTp0/X888/X/v376/x8fHasWNH49HQ9Pl+tBw4cKD2799fBw4cqA8++KC++OKLpn+NAD1FgAD0KXGRO3v27Knjx4/X66+/Xh9++GHTv3qAm5oAAegDx44dq3379omLm+Rs3bq1HnvssXrhhReq1WrVJ5980vSfCMBNQ4AA9LAv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LtXCwkI9/PDD64bHyMhInT17tunJAF0ECAB9Z+fOnd8+iO/cubPpOT/KD4mOb87TTz9dnU6n6ekAKxIgAPSVVqvV9UB++vTppmfdsM8//7zOnTtXCwsLtXv37huODm+3AnqFAAGgr8zMzHQ9mN9xxx31j3/8o+lpXb6JjVdffbUOHz5cDzzwwA8Kjm/OrbfeWgsLC03/OAA3RIAA0Feee+65VR/Up6en6913343uuXbtWl2+fLmWl5er1WrVE088UXv37q3777//v4qN/39++ctf1pEjR7zdCugpAgSAvjM8PLzmg/s999xTv/3tb+vll1+u+fn5mp+fr5mZmZqdnf3265XOjXzPH/7wh9q/f3+Nj4/Xjh07fnRkfP88/PDDtbCwUJcuXWr6ZQb4rwgQAPpOu92un/3sZxv+8N/U2bNnj+gA+oYAAaAvXbhwobZu3dp4PPw351e/+lXt3bu3Dhw4IDqAviNAAOhb169frz//+c91zz33NB4Vq50HHnigDh8+XK+++mqdO3euPv/886ZfNoCflAABYCC8++67NT093Uhk7Nixo8bHx+uPf/xjTU1N1fT0tNgABpYAAWCg/Otf/6q//vWvNTs7Wy+99NJ3PmA+MzOz7ofQV/uel156qQ4dOlSHDx+uVqtVy8vLdfny5bp27VrTPzLATUWAAAAAMQIEAACIESAAAECMAAEAAGIECAAAECNAAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIgRIAAAQIwAAQAAYgQIAAAQI0AAAIAYAQIAAMQIEAAAIEaAAAAAMQIEAACIESAAAECMAAEAAGIECAAAECNAAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIgRIAAAQIwAAQAAYgQIAAAQI0AAAIAYAQIAAMQIEAAAIEaAAAAAMQIEAACIESAAAECMAAEAAGIECAAAECNAAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIgRIAAAQIwAAQAAYgQIAAAQI0AAAIAYAQIAAMQIEAAAIEaAAAAAMQIEAACIESAAAECMAAEAAGIECAAAECNAAACAGAECAADECBAAACBGgAAAADECBAAAiBEgAABAjAABAABiBAgAABAjQAAAgBgBAgAAxAgQAAAgRoAAAAAxAgQAAIj5H4yJWG8St6MpAAAAAElFTkSuQmCC';

var photo1 = { date_posted: new Date(), caption: 'Top of Mount Tam via Fire Access Road' };
var photo1filter = photo1;

suite('DBint', function(){
	test('init', function(done){
		DBinit.init(function(err){
			assert.isUndefined(err);
			done();
		});
	});
});

suite('UserModel', function(){
	test('add', function(done){
		UserModel.add(user1, function(err){
			assert.isUndefined(err);
			done();
		});
	});

	test('findOne', function(done){
		UserModel.findOne(user1filter, function(err, row){
			assert.ok(row);
			user1entry = row;
			done();
		});
	});

	test('find', function(done){
		UserModel.find(user1filter, function(err, rows){
			assert.lengthOf(rows, 1);
			done();
		});
	});
});

suite('LocationModel', function(){
	test('add', function(done){
		LocationModel.add(location1, function(err){
			assert.isUndefined(err);
			done();
		});
	});

	test('findOne', function(done){
		LocationModel.findOne(location1filter, function(err, row){
			assert.ok(row);
			location1entry = row;
			done();
		});
	});

	test('find', function(done){
		LocationModel.find(location1filter, function(err, rows){
			assert.lengthOf(rows, 1);
			done();
		});
	});
});

suite('RecordModel', function(){
	test('add', function(done){
		record1.location_id = location1entry._id;
		record1.user_id = user1entry._id;
		RecordModel.add(record1, function(err){
			assert.isUndefined(err);
			done();
		});
	});

	test('findOne', function(done){
		RecordModel.findOne(record1filter, function(err, row){
			assert.ok(row);
			record1entry = row;
			done();
		});
	});

	test('find', function(done){
		RecordModel.find(record1filter, function(err, rows){
			assert.lengthOf(rows, 1);
			done();
		});
	});
});

suite('PhotoModel', function(){
	test('add', function(done){
		photo1.record_id = record1entry._id;
		PhotoModel.add(photo1, imgContent, function(err){
			assert.isUndefined(err);
			done();
		});
	});

	test('findOne', function(done){
		PhotoModel.findOne(photo1filter, function(err, row){
			assert.ok(row);
			assert.equal(row.content, imgContent);
			photo1entry = row;
			done();
		});
	});

	test('getPhoto', function(done){
		PhotoModel.getPhoto(photo1entry._id, function(err, file){
			assert.isFalse(err);
			assert.equal(file, imgContent);
			done();
		});
	});

	test('find', function(done){
		PhotoModel.find(photo1filter, function(err, rows){
			assert.lengthOf(rows, 1);
			done();
		});
	});
});

suite('CleanUp', function(){
	test('remove user1', function(done){
		UserModel.remove(user1filter, function(err){
			assert.isUndefined(err);
			done();
		});
	});

	test('remove location1', function(done){
		LocationModel.remove(location1filter, function(err){
			assert.isUndefined(err);
			done();
		});
	});

	test('remove record1', function(done){
		RecordModel.remove(record1filter, function(err){
			assert.isUndefined(err);
			done();
		});
	});

	test('remove photo1', function(done){
		PhotoModel.remove(photo1filter, function(err){
			assert.isUndefined(err);
			done();
		});
	});
});

