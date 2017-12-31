var cors = require('cors');

//process.env.CORS;

module.exports = {
	whitelist: [process.env.LOCALHOST1, process.env.LOCALHOST2, process.env.CHROME_EXT],
    corsOptions: {
        origin: function (origin, callback) {
            var originIsWhitelisted = this.whitelist.indexOf(origin) !== -1;
            callback(null, originIsWhitelisted);
        }
    },
    use: cors(this.corsOptions)
};


