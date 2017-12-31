var jwt = require('express-jwt');
var jwtReal = require('jsonwebtoken');

var ENV = process.env.ENVIRONMENT;

console.log(ENV);
/*
 var authSecret = new Buffer(process.env.AUTH0_CLIENT_SECRET_SEARCH, 'base64');
 var authChromeSecret = new Buffer(process.env.AUTH0_CLIENT_SECRET_CHROME)
 */

var authenticate = jwt({
    secret: new Buffer(process.env.AUTH0_CLIENT_SECRET_SEARCH, 'base64'),
    audience: process.env.AUTH0_CLIENT_ID_SEARCH
});
var authenticateChrome = jwt({
    secret: new Buffer(process.env.AUTH0_CLIENT_SECRET_CHROME),
    audience: process.env.AUTH0_CLIENT_ID_CHROME
});

module.exports = {
    authenticate: authenticate,
    authenticateChrome: authenticateChrome
};




