const Redis = require('ioredis');
const {app} = require('../../config')
let db;
module.exports = function () {
	if (db) {
		return db;
	} else {
		db = new Redis(app.port, app.host);
		return db;
	}
}
