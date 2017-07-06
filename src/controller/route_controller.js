
const AmkError = require('../lib/amk_error');

let routeService;
let route;

class RouteController {

	constructor(...dependencies) {
		[routeService, route] = dependencies;
	}

	async get(req, res) {
		let params = req.params
		let value = await route.findById(params.id);
		if (value) {
			delete value._id;
			res.json(value);
		} else {
			throw new AmkError('not found', 404);
		}
	}

	async create(req, res) {
		let data = {
			status: "in progress"
		}
		let inserted = await route.insertOne(data);
		let id = inserted.insertedId.toString();
		await routeService.addJob(req.app.locals.routeQ, id, req.body);
		res.json({
			token: id
		});
	}


}
module.exports = RouteController;
