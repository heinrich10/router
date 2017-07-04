
const AmkError = require('../lib/amk_error');
const random = require('../lib/random');

let route;

class RouteCollector {

	constructor(...dependencies) {
		[route] = dependencies;
	}

	async update(payload) {
		let id = payload.id;
		let data = await route.findById(id);
		if (data) {
			delete payload.id;
			await route.updateById(id, payload);
		}

	}

}
module.exports = RouteCollector;
