
const chai = require('chai');
const expect = chai.expect;
const RouteValidator = require('../../../src/validator/route_validator');
const AmkError = require('../../../src/lib/amk_error');

describe('Route Validator Test', function () {
	describe('test routeValidator.insert', function () {
		it('should throw an error when input is not an array ', function (done) {
			let routeValidator = new RouteValidator();
			let input = {
				test: 'test'
			};
			let req = {
				body: input
			}
			routeValidator.insert(req, null, function (err) {
				expect(err).to.be.not.undefined;
				expect(err).to.be.instanceOf(AmkError);
				done();
			});
		});
		it('should throw an error when input array length < 2', function (done) {
			let routeValidator = new RouteValidator();
			let input = [
				[1,2]
			];
			let req = {
				body: input
			}
			routeValidator.insert(req, null, function (err) {
				expect(err).to.be.not.undefined;
				expect(err).to.be.instanceOf(AmkError);
				done()
			});
		});
		it('shoud thrown an error when one of the element is not an array', function (done) {
			let routeValidator = new RouteValidator();
			let input = [
				[1,2],
				1
			];
			let req = {
				body: input
			}
			routeValidator.insert(req, null, function (err) {
				expect(err).to.be.not.undefined;
				expect(err).to.be.instanceOf(AmkError);
				done()
			});
		});
		it('should do nothing when input array length >= 2', function (done) {
			let routeValidator = new RouteValidator();
			let input = [
				[1,2],
				[1,2]
			];
			let req = {
				body: input
			}
			routeValidator.insert(req, null, function (err) {
				expect(err).to.be.undefined;
				done();
			});
		});
	});
});
