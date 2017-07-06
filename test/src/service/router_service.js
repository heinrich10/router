
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const RouteService = require('../../../src/service/route_service');

describe('Route Service Test', function () {
	describe('test routeService.addJob', function () {
		it('should add a job to the supplied queuenpm in', function (done) {
			let routeService = new RouteService();
			let id = 1;
			let path = 'path';
			let addJob = sinon.stub().returns(Promise.resolve(1));
			let queue = {
				add: addJob
			}
			routeService.addJob(queue, id, path).then(() => {
				let returnVal = addJob.args[0][0]
				expect(addJob.calledOnce).to.be.true;
				expect(returnVal.id).to.be.equal(id)
				expect(returnVal.path).to.be.equal(path);
				done();
			})
		});
	});
});
