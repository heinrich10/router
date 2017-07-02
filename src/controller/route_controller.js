
const AmkError = require('../lib/amk_error');
const random = require('../lib/random');

let routeService;
let route;

class RouteController {

	constructor(...dependencies) {
		[routeService, route] = dependencies;
	}

	async get(req, res) {
		let params = req.params
		let value = await hello.find(params.id);
		if (value) {
			res.json({
				msg: value
			});
		} else {
			throw new AmkError('not found', 404);
		}
	}

	async create(req, res) {
		await routeService.addJob(req.app.locals.routeQ, req.body);
		res.json('ok');
	}


}
module.exports = RouteController;
