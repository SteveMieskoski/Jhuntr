var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var ContactSchema = new Schema({
    "show": {
        type: Boolean,
        default: true
    },
    "address": {
        type: String,
        default: ''
    },
    "phone": {
        "type": String,
        default: ''
    },
    "postalCode": {
        type: String,
        default: ''
    },
    "city": {
        type: String,
        default: ''
    },
    "countryCode": {
        type: String,
        default: ''
    },
    "state": {
        type: String,
        default: ''
    }
});


module.exports = mongoose.model('ContactData', ContactSchema, 'ContactData');


