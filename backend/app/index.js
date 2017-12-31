var express = require('express');
var app = express();

// nodeJS modules
var path = require('path');
var fs = require('fs');
var request = require('request');

var middleware = require('./middleware');
var pathHelper = require('./utils/path-helper');
var logDirectory = pathHelper.root('logs/');

var routes = require('./routes');
// maybe pull out into either the server www or someplace else
var db = require('../database/mongodb.connect');

app.use(middleware.log);
app.use(routes);
module.exports = app;