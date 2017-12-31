var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var BasicsSchema = new Schema({
    "firstname": {
        "type": String,
        default: ''
    },
    "lastname": {
        "type": String,
        default: ''
    },
    "label": {
        "type": String,
        default: ''
    },
    "picture": {
        "type": String,
        default: ''
    },
    "email": {
        "type": String,
        default: ''
    },
    "email_icon": {
        "type": String,
        default: 'fa-at'
    },
    "phone": {
        "type": String,
        default: ''
    },
    "phone_icon": {
        "type": String,
        default: 'fa-phone'
    },
    "location": {
        "type": String,
        default: ''
    },
    "location_icon": {
        "type": String,
        default: 'fa-map-marker'
    },
    "location_show": {
        type: Boolean,
        default: true
    },
    "website": {
        "type": String,
        default: ''
    },
    "website_icon": {
        "type": String,
        default: 'fa-link'
    },
    "website_show": {
        type: Boolean,
        default: true
    },
    "summary": {
        "type": String,
        default: ''
    }
});

module.exports = mongoose.model('BasicsData', BasicsSchema, 'BasicsData');


