var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var AchievementSchema = new Schema({
    "show": {
        type: Boolean,
        default: true
    },
    "label": {
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
    "details": {type: String, default: ''}
});

module.exports = mongoose.model('AchievementData', AchievementSchema, 'AchievementData');