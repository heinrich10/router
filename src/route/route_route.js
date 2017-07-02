
const express = require('express');
const router = express.Router();
const wrap = require('../lib/wrapper');

module.exports = function (jsonParser, routeValidator, routeController) {
	router.get('/:id', wrap(routeController.get));
	router.post('/', jsonParser, routeValidator.insert, wrap(routeController.create))
	return router;
}
