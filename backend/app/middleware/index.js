

module.exports = {
    cors: require('./config/cors'),
    authenticate: process.env.ENVIRONMENT === 'production' ? require('./config/authentication').authenticate : function(req, res, next){console.log('Authentication Disabled'); next();},
    authenticateChrome: require('./config/authentication').authenticateChrome,
    log: require('./config/logging'),
    uploadFile: require('./config/uploading').file,
    uploadImage: require('./config/uploading').image,
    uploadPublic: require('./config/uploading').public,
    bodyParser: require('body-parser'),
    serveStatic: require('serve-static'),
    compression: require('compression'),
    serveIndex: require('serve-index'),
    applyMw: function(handler){


        console.log('auth base');
        return [this.cors.use, handler]

    },
};