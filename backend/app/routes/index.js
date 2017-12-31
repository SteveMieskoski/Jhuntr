var express = require('express');
var app = express();
//var router = express.Router();
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var compression = require('compression');
var serveIndex = require('serve-index');

var middleware = require('../middleware');
var authenticate = require('../middleware').authenticate;
var pathHelper = require('../utils/path-helper');

var creatorRoutes = require('./routers/creator/creator');
var postingRoutes = require('./routers/posting/posting');
var userRoutes = require('./routers/user/user');
var converterRoutes = require('./routers/converter/converter');
var chromeRoutes = require('./routers/posting/posting-chrome');
var emailRoutes = require('./routers/email');
var routers = require('./routers');


//module.exports = routers;

module.exports = app;

    //app.use('/', function(req, res){
    //    res.status(200).json({message: "test"})
    //});

    switch (process.env.DEPLOY_STATE) {
        case 'development':
            app.get('*?please-wait.min.js', function (req, res, next) {
                req.url = req.url + '.gz';
                res.set('Content-Encoding', 'gzip');
                next();
            });

            app.use(middleware.serveStatic(pathHelper.frontend('/dist/'), {'etag': false, 'setHeaders': setHeaders}));
            //app.use(serveStatic(pathHelper.root('/src'), {'etag': false, 'setHeaders': setHeaders}));
            break;
        case 'production':
            app.get('*.js', function (req, res, next) {
                req.url = req.url + '.gz';
                res.set('Content-Encoding', 'gzip');
                next();
            });

            app.get('*.(woff|woff2|eot|tff)', middleware.compression(), function (req, res, next) {
                //  req.url = req.url + '.gz';
                //  res.set('Content-Encoding', 'gzip');
                next();
            });

            app.use(middleware.serveStatic(pathHelper.root('/dist/'), {'etag': false, 'setHeaders': setHeaders}));
            break;
        default:
            app.use(middleware.serveStatic(pathHelper.root('/dist/'), {'etag': false, 'setHeaders': setHeaders}));
            console.log('unkown user; aboarting server start');
            // new Error('Unknown user.  Aborting Server Start');
            break;
    }


    app.use(routers);
    app.use('/example', serveIndex(pathHelper.root('examples/'), {'icons': true}), serveStatic(pathHelper.root('/backend', 'examples/')));


    switch (process.env.DEPLOY_STATE) {
        case 'development':
            console.log('frontend -> /', pathHelper.frontend('/'));
            console.log(pathHelper.root('/public', 'pdf/'));
            app.use('/public/pdf', function (req, res) {
                console.log(pathHelper.root('/public', req.url));
                res.sendFile(pathHelper.root('/public/pdf', req.url));
            });
            app.use('/temp', function (req, res) {
                console.log(pathHelper.root('/controllers/integrations/temp', req.url));
                res.sendFile(pathHelper.root('/controllers/integrations/temp', req.url));
            });
            //	app.use(serveStatic(pathHelper.frontend('/dist/'), {'setHeaders': setHeaders}));
            app.use(middleware.serveStatic(pathHelper.frontend('/'), {'setHeaders': setHeaders}));

            break;
        case 'production':
            app.use(middleware.serveStatic(pathHelper.root('/'), {'setHeaders': setHeaders}));
            break;
        default:
            app.use(middleware.serveStatic(pathHelper.root('/'), {'setHeaders': setHeaders}));
            console.log('unkown user; aboarting server start');
            // new Error('Unknown user.  Aborting Server Start');
            break;
    }


    function setHeaders(res, path) {
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
        res.setHeader("Expires", "0"); // Proxies.
    }

