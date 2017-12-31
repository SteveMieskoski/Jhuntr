var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var SkillsSchema = new Schema({
    "show": {
        type: Boolean,
        default: true
    },
    "name": {
        type: String,
        default: ''
    },
    "level": {
        type: String,
        default: 'level-5'
    },
    "keywords": [ {"item" :{type: String}}]
});

module.exports = mongoose.model('SkillsData', SkillsSchema, 'SkillsData');