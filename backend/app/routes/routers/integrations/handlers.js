var express = require('express');
var multer = require("multer");
var Promise = require('bluebird');
var upload = multer({dest: 'public/image/'});

var integrations = require('../../../controllers/integrations/index');
var templates = require('../../../controllers/templates/index');



module.exports.routes = [
    {path: '/dropbox/downloadFile/:userId', verb: 'post', handler: integrations.download, router: 'cloud'},
    {path: '/companyLookup', verb: 'post', handler: integrations.companyLookup, router: 'services'}
    ];