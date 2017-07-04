
const Mongo = require('./parent/mongo')

class Route extends Mongo{

	constructor() {
		super('route');
	}
}
module.exports = Route;
