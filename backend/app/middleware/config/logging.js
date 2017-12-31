var morgan = require('morgan');
var winston = require('winston');
var expressWinston = require('express-winston');
var fs = require('fs');
var path = require('path');
var pathHelper = require('../../utils/path-helper');

//require('winston-daily-rotate-file');

var DailyRotateFile = require('winston-daily-rotate-file');

var getTransport = function(name, level) {

    var transport = new DailyRotateFile({
        name: name,
        colorize: false,
        filename: path.join(__dirname, './logs/' + name + '.log'),
        datePattern: '.yyyy-MM-dd',
        maxsize: 500000,
        level: level || 'info',
        json: false
    });

    return transport;
};

var loggers = {

    default: new (winston.Logger)({
        transports: [
            getTransport('general'),
            getTransport('error', 'error')
        ]
    }),


    access: new (winston.Logger)({
        transports: [
            getTransport('access')
        ]
    }),

    db: new (winston.Logger)({
        transports: [
            getTransport('db')
        ]
    }),

    maintain: new (winston.Logger)({
        transports: [
            getTransport('maintain')
        ]
    }),

    upload: new (winston.Logger)({
        transports: [
            getTransport('upload')
        ]
    })
};
/*
module.exports = {
    logger: new (winston.Logger)({
        transports: [
            getTransport('general'),
            getTransport('error', 'error')
        ]
    }),
    expressWinston: this.logger({

        winstonInstance: this.logger,
        meta: true, // optional: control whether you want to log the meta data about the request (default to true)
        expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
        level: 'debug',
        colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
        skip: function (req, res) {
            if (/\.html/.test(req.url) || /fontawesome-webfont/.test(req.url) || /\.png/.test(req.url) || /\.jpg/.test(req.url) || /\.svg/.test(req.url) || /\.css/.test(req.url) || /\.js/.test(req.url)) {
                return true
            }
        } // optional: allows to skip some log messages based on request and/or response
    })
};
*/



exports.logger = winston.loggers.get('general');
module.exports = expressWinston.logger({

        winstonInstance: this.logger,
        meta: true, // optional: control whether you want to log the meta data about the request (default to true)
        expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
        level: 'debug',
        colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
        skip: function (req, res) {
            if (/\.html/.test(req.url) || /fontawesome-webfont/.test(req.url) || /\.png/.test(req.url) || /\.jpg/.test(req.url) || /\.svg/.test(req.url) || /\.css/.test(req.url) || /\.js/.test(req.url)) {
                return true
            }
        } // optional: allows to skip some log messages based on request and/or response
    });


//   app.use();