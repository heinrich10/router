
const AmkError = require('../lib/amk_error');

class RouteValidator {
	insert(req, res, next) {
		let error = [];
		let errObj;
		let body = req.body;
		if (Array.isArray(body)) {
			if (body.length < 2) {
				error.push('at least 2 points');
			}
			if (!body.every(Array.isArray)) {
				error.push('one of the element is not an array');
			}
		} else {
			error.push('input should be an array');
		}


		if (error.length > 0) {
			errObj = new AmkError(error, 400);
		}
		next(errObj);
	}
}
module.exports = RouteValidator;
