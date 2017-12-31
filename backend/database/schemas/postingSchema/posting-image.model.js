var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var PostImageSchema = new mongoose.Schema({
    "userId" : {type: String, default: ''},
    "user_id" : {type: String, default: ''},
    'image_data': Buffer,
    "path": {type: String, default: ''},
    "contentType": {type: String, default: ''}
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('PostImage', PostImageSchema, 'PostImage');