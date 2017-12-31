var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var EmploymentSchema = new Schema({
    "show": {
      type: Boolean,
      default: true
    },
    "company": {
        type: String,
        default: ''
    },
    "position": {
        type: String,
        default: ''
    },
    "supervisor": {
        type: String,
        default: ''
    },
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

    },
    "summary": {
        type: String,
        default: ''
    },
    "details": [{
        "detail": {
            type: String,
            default: ''
        },
        "show": {
            type: Boolean,
            default: true
        }

    }],
    "highlights": [ {"item" : {type: String}}],
    "can_contact": {type: Boolean, default: false},
    "current": {type: Boolean, default: true}

});

module.exports = mongoose.model('EmploymentData', EmploymentSchema, 'EmploymentData');