
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const RouteCollector = require('../../../src/collector/route_collector');

describe('Route Collector Test', function () {
	describe('test routeCollector.update', function () {
		it('should update when record is present', function (done) {
			let findByIdStub = sinon.stub().returns(Promise.resolve(1));
			let updateByIdStub = sinon.stub().returns(Promise.resolve(1));
			let route = {
				findById: findByIdStub,
				updateById: updateByIdStub
			}
			let routeCollector = new RouteCollector(route);
			routeCollector.update({id:1}).then( () => {
				expect(findByIdStub.calledOnce).to.be.true;
				expect(updateByIdStub.calledOnce).to.be.true;
				done();
			});
		});
		it('should not update when record is not present', function (done) {
			let findByIdStub = sinon.stub().returns(Promise.resolve(null));
			let updateByIdStub = sinon.stub().returns(Promise.resolve(1));
			let route = {
				findById: findByIdStub,
				updateById: updateByIdStub
			}
			let routeCollector = new RouteCollector(route);
			routeCollector.update({id:1}).then( () => {
				expect(findByIdStub.calledOnce).to.be.true;
				expect(updateByIdStub.calledOnce).to.be.false;
				done();
			});

		});
	});
});
