var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var AttachmentsSchema = new Schema({
    "img_data": Buffer,
    "img_contentType": String,
    "image_path": String,
    "asStringHolder": {type: String, default: ''},
    "user_photo": {type: Boolean, default: true}
});

module.exports = mongoose.model('AttachmentsData', AttachmentsSchema, 'AttachmentsData');