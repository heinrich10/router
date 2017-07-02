/* eslint no-global-assign: "off", no-console: "off" */

Promise = require('bluebird');
const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const queue = require('bull');
const appConfig = require('./config').app;
const redis = {
	redis: {
		host: appConfig.redis.host,
		port: appConfig.redis.port
	}
}

const app = express();
const routeQ = new queue('route', redis);
const apiQ = new queue('api', redis);
app.locals.routeQ = routeQ;
app.locals.apiQ = apiQ;




// models
const Hello = require('./src/model/hello');
const Route = require('./src/model/route');

// services
const HelloService = require('./src/service/hello_service');
const RouteService = require('./src/service/route_service');

// validators
const HelloValidator = require('./src/validator/hello_validator');
const RouteValidator = require('./src/validator/route_validator');

//controllers
const HelloController = require('./src/controller/hello_controller');
const RouteController = require('./src/controller/route_controller');

// middlewares
const errorHandler = require('./src/middleware/error_handler');

// routes
const helloRoute = require('./src/route/hello_route');
const routeRoute = require('./src/route/route_route');

//instantiate models
const hello = new Hello();
const route = new Route();

// instantiate service
const helloService = new HelloService();
const routeService = new RouteService();

// instantiate validators
const helloValidator = new HelloValidator();
const routeValidator = new RouteValidator();

// instantiate controllers
const helloController = new HelloController(helloService,  hello);
const routeController = new RouteController(routeService, route);

app.use('/hellos', helloRoute(jsonParser, helloValidator, helloController));
app.use('/route', routeRoute(jsonParser, routeValidator, routeController));

app.use(errorHandler);

app.listen(3000, function(){
	console.log('running');
});

apiQ.process(function (job, done) {
	console.log(job.data);
	done();
})
