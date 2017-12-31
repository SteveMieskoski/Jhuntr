var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var TechnologiesSchema = new Schema({
    "show": {
        type: Boolean,
        default: true
    },
    "name": {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('TechnologiesData', TechnologiesSchema, 'TechnologiesData');