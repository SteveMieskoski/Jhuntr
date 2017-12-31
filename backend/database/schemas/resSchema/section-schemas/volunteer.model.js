var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var VolunteerSchema = new Schema({
    "show": {
        type: Boolean,
        default: true
    },
    "organization": {
        type: String,
        default: ''
    },
    "position": {
        type: String,
        default: ''
    },
    "website": {
        type: String,
        default: ''

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

    }]

});

module.exports = mongoose.model('VolunteerData', VolunteerSchema, 'VolunteerData');