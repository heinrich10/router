
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const RouteController = require('../../../src/controller/route_controller');
const AmkError = require('../../../src/lib/amk_error');

describe('Route Controller Test', function () {
	describe('test routeCollector.get', function () {
		it('should return route if found', function (done) {
			let value = {route:[[1,1],[2,2]]};
			let findByIdStub = sinon.stub().returns(Promise.resolve(value));
			let route = {
				findById: findByIdStub,
			}
			let routeController = new RouteController(null, route);
			let res = {
				value: this.value,
				json: function (value) {
					this.value = value;
				}
			}
			routeController.get({params:1}, res).then( () => {
				expect(res.value).to.be.deep.equal(value);
				expect(findByIdStub.calledOnce).to.be.true;
				done();
			}).catch( (err) => {
				expect(err).to.be.undefined;
			});
		});
		it('should return and error if no value found', function (done) {
			let findByIdStub = sinon.stub().returns(Promise.resolve(null));
			let route = {
				findById: findByIdStub,
			}
			let routeController = new RouteController(null, route);
			routeController.get({params:1}).then( () => {

			}).catch( (err) => {
				expect(err).to.be.instanceOf(AmkError);
				done();
			});
		});
	});
	describe('test routeCollector.create', function () {
		it('should return created id after creating record', function (done) {
			let addJobStub = sinon.stub().returns(Promise.resolve(1));
			let routeService = {
				addJob: addJobStub
			}
			let id = 123
			let insertOneStub = sinon.stub().returns(Promise.resolve({insertedId: id}));
			let route = {
				insertOne: insertOneStub,
			}
			let routeController = new RouteController(routeService, route);
			let req = {
				body : 1,
				app: {
					locals: {
						routeQ: function () {}
					}
				}
			}
			let res = {
				value: this.value,
				json: function (value) {
					this.value = value;
				}
			}
			routeController.create(req, res).then( () => {
				expect(insertOneStub.calledOnce).to.be.true;
				expect(addJobStub.calledOnce).to.be.true;
				expect(res.value).to.have.property('token');
				expect(res.value.token).to.be.equal(id.toString());
				done();
			}).catch( (err) => {
				expect(err).to.be.undefined;
				done(err);
			});
		});
	});
});
