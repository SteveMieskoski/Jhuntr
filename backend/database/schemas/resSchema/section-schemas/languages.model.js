var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var LanguagesSchema = new Schema({
    "show": {
        type: Boolean,
        default: true
    },
    "language": {
        type: String,
        default: ''
    },
    "fluency": {
        type: String,
        default: ''
    },
    "icon_on": {
        type: String,
        default: "fa-circle"
    },
    "icon_off": {
        type: String,
        default: "fa-circle-o"
    },
    "level_one": {
        type: Boolean,
        default: true
    },
    "level_two": {
        type: Boolean,
        default: false
    },
    "level_three": {
        type: Boolean,
        default: false
    },
    "level_four": {
        type: Boolean,
        default: false
    },
    "level_five": {
        type: Boolean,
        default: false
    }
  /*  "level_one": {
        type: String,
        default: ''
    },
    "level_two": {
        type: String,
        default: ''
    },
    "level_three": {
        type: String,
        default: ''
    },
    "level_four": {
        type: String,
        default: ''
    },
    "level_five": {
        type: String,
        default: ''
    }*/
});

module.exports = mongoose.model('LanguagesData', LanguagesSchema, 'LanguagesData');