// Bring Mongoose into the app
var mongoose = require( 'mongoose');
var MONGO_URI;

MONGO_URI = 'mongodb://localhost:27017/development';
/*
if (process.env.LOGNAME === 'sysadmin') {
   // MONGO_URI = 'mongodb://localhost:27017/development';

    console.log(MONGO_URI);
} else if (process.env.LOGNAME === 'sysadmin') {  // never stops here (I know)
    MONGO_URI = 'mongodb://localhost:27017/creator';
} else {
    MONGO_URI = 'mongodb://localhost:27017/production';
}
*/
mongoose.connect(MONGO_URI);
mongoose.set('debug', true);
//if(process.env.DEBUG_DB === 'true') {
//    mongoose.set('debug', true);
//}


function tryReconnect(){
    var attempts = 0;
    var interval = setInterval(function(){
        mongoose.connect(MONGO_URI);
        attempts++;
        if(attempts >= 20){
            clearInterval(interval);
        }
    }, 2000);

    mongoose.connection.on('connected', function () {
        clearInterval(interval);
        console.log('Mongoose reconnected');
    });

}

mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open');
});

mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
    //tryReconnect();
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

module.exports = mongoose.connection;
