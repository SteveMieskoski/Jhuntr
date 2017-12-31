var express = require('express');
var router = express.Router();

module.exports = router;
var converter = require('./handlers');
var middleware = require('../../../middleware/index');

var routers = {
    converter: router
};

for(var i=0; i<converter.routes.length; i++){
    console.log(converter.routes[i].verb);
    routers[converter.routes[i].router][converter.routes[i].verb](converter.routes[i].path, converter.routes[i].handler);
}

module.exports = routers;
/*
router.get('/downloadMain/:id', converter.downloadMain);

router.get('/processed/:id/:postingId', converter.processed);

router.get('/toEdit/:id', converter.toEdit);

router.get('/file/:resId/:type', converter.file);
    */