var express = require('express');
var router = express.Router();
var servicesRouter = express.Router();


var middleware = require('../../../middleware/index');
var handlers = require('./handlers');

//module.exports = router;
//module.exports.upload = uploadRouter;
var routers = {
    cloud: router,
    services: servicesRouter
};

for(var i=0; i<handlers.routes.length; i++){
    console.log(handlers.routes[i].verb);
    routers[handlers.routes[i].router][handlers.routes[i].verb](handlers.routes[i].path, handlers.routes[i].handler);
}

module.exports = routers;
