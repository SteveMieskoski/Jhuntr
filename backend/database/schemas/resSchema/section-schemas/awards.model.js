var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var AwardsSchema = new Schema({
    "show": {
        type: Boolean,
        default: true
    },
    "title": {
        type: String,
        default: ''
    },
    "date": {
        type: String,
        default: ''

    },
    "awarder": {
        type: String,
        default: ''
    },
    "summary": {
        type: String,
        default: ''
    },
    "icon_show": {
        type: Boolean,
        default: true
    },
    "icon": {
        type: String,
        default: "fa-diamond"
    },
});

module.exports = mongoose.model('AwardsData', AwardsSchema, 'AwardsData');