var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var CoursesSchema = new Schema({
    "show": {
        type: Boolean,
        default: true
    },
    "name": {
        type: String,
        default: ''
    },
    "summary": {type: String, default: ''},
    "keywords": [ {"item" :{type: String, default: ''}}]
});

module.exports = mongoose.model('CoursesData', CoursesSchema, 'CoursesData');