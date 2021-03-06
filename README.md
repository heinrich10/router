# Router
[![CircleCI](https://circleci.com/gh/heinrich10/router.svg?style=svg)](https://circleci.com/gh/heinrich10/router) [![codecov](https://codecov.io/gh/heinrich10/router/branch/master/graph/badge.svg)](https://codecov.io/gh/heinrich10/router)

## Overview

http request --> router --> queue --> route_worker --> queue --> router

basically when the user sends an api request, the router will process it and then sends a message to route_worker through our redis queue. After the route_worker processes the data, it will send the data through the redis queue back to router for saving to the database (mongodb)

route_worker handles the api request. the decision to separate this from the API is because I am expecting the google maps api to be slow when we have a lot of waypoints

## Elements
- routes - this is a simple express router, all request will pass through this and get routed to middleware
- middleware - this is a processing stage, includes jsonParser, errorhandler, validators
- validator - validators are functions to do validation on the json request
- controller - controllers are in charge of the flow calling different components to process the request and gives back a reply
- model - models are objects use to save data to db
- lib - shared utility functions like wrapper
- service - are other processes that is shared across controller functions
- collectors - these are objects that processes the reply from the worker

## Assumptions

1. input will always be an array inside an array. the first element will be the origin, the last element will be the destination. anything in between will be the waypoints
2. since mongodb returns a unique id, api will use that instead of generating some kind of uuid
3. using the google direction api, we assume that it will always return the closest path


## Prerequisites

1. make sure docker is install
2. make sure there is a redis and a mongodb instance (assumption is they are all running in docker)
3. configure the ```config/env/docker/app.json``` to point to your redis and mongodb instance

## How to run

1. go to the root directory and run: ``` docker build -t router . ```
2. make sure redis is already running
3. make sure mongodb is already running
4. make sure you have a docker network so that each service can discover each other
5. execute ``` docker run -it -network=docker_nat -name=router router```

## How to run using docker compose

1. work directory is router
2. git clone router-worker to the working directory
3. run ``` docker-compose build ```, wait a while
4. run ``` docker-compose up -d ```
5. make a post request to http://ip-address:3000/route with route info

* ip address could be localhost or 192.168.99.100 depends on your docker configuration

oh, and this is powered by [amk.js](https://github.com/heinrich10/amk), another side project I have that will try to be an apiserver quickstart. This is still in alpha though, please star if you find useful, thanks in advance.
