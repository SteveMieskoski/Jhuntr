var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var ProjectSchema = new Schema({
    "show": {
        type: Boolean,
        default: true
    },
    "name": {
        type: String,
        default: ''
    },
    "summary": {
        type: String,
        default: ''
    },
    "details": [{
        "detail":{
            type: String,
            default: ''
        },
        "show": {
            type: Boolean,
            default: true
        }
    }],
    "website": {
        type: String,
        default: ''

    },
    "location": {
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
    },
    "startDate": {
        type: String,
        default: ''

    },
    "endDate": {
        type: String,
        default: ''

    }

});

module.exports = mongoose.model('ProjectData', ProjectSchema, 'ProjectData');