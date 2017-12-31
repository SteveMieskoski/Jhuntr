var express = require('express');
var router = express.Router();
/*
module.exports = router;
var posting = require('./handlers');
var middleware = require('../../../middleware/index');

router.use('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.post('/jhExtData/:id/:status',
    middleware.cors.use,
    middleware.authenticateChrome,
    posting.jhExtData
);


app.use('/chrome', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    next();
}, authenticateChrome);
app.use('/chrome', cors(corsOptions), authenticateChrome, postingRoutes);

    */