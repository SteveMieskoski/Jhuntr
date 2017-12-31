var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var EducationSchema = new Schema({
    "show": {
        type: Boolean,
        default: true
    },
    "institution": {
        type: String,
        default: ''
    },
    "area": {
        type: String,
        default: ''
    },
    "studyType": {
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
    "current": {
        type: Boolean,
        default: false
    },
    "graduated": {
        type: Boolean,
        default: true
    },
    "gpa_show": {
        type: Boolean,
        default: true
    },
    "gpa": {
        type: String,
        default: ''
    },
    "gpaScale": {
        type: String,
        default: ''
    },
    "courses": [{item: {type: String}}]
});

module.exports = mongoose.model('EducationData', EducationSchema, 'EducationData');