var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var InterestsSchema = new Schema({
    "show": {
        type: Boolean,
        default: true
    },
    "name": {
        type: String,
        default: ''
    },
    "icon_show": {
        type: Boolean,
        default: true
    },
    "icon": {
        type: String,
        default: "fa-heart"
    },
    "summary": {type: String, default: ''},
    "keywords": [{"item": {type: String, default: ''}}]
});

module.exports = mongoose.model('InterestsData', InterestsSchema, 'InterestsData');