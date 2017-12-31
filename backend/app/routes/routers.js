var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var compression = require('compression');
var serveIndex = require('serve-index');

var middleware = require('../middleware');
var authenticate = middleware.authenticate;

var creator = require('./routers/creator/creator');
var posting = require('./routers/posting/posting');
var user = require('./routers/user/user');
var converter = require('./routers/converter/converter');
var emailRoutes = require('./routers/email');
var integrations = require('./routers/integrations');
module.exports = router;

router.use('/creator', bodyParser.json({limit: '10mb'}), authenticate, creator.creator);
router.use('/posting', bodyParser.json(), authenticate, posting.posting);
router.use('/listor', bodyParser.json(), authenticate, posting.listor);
router.use('/user', bodyParser.json(), authenticate, user.user);
router.use('/converter', bodyParser.json({limit: '10mb'}), authenticate, converter.converter);
router.use('/chrome',  bodyParser.json(), posting.chrome);
router.use('/upload', creator.upload);
router.use('/email', bodyParser.json(), emailRoutes);
router.use('/cloud', bodyParser.json(), integrations.cloud);
router.use('/services', bodyParser.json(), integrations.services);

/*
router.use('/creator', middleware.cors, creator);
router.use('/posting', posting);
router.use('/user', user);
router.use('/converter', converter);
router.use('/listor', posting.listor);
router.use('/chrome', postingChrome);

router.use('/email', middleware.bodyParser.json(), emailRoutes);

    */
