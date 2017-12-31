var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var ExternalFileSchema = new mongoose.Schema({
    "userId" : {type: String, default: ''},
    'file_data': Buffer,
    "path": {type: String, default: ''},
    "encoding": {type:String, default: ''},
    "originalName": {type: String, default: ''},
    "contentType": {type: String, default: ''},
    "fileExtension": {type: String, default: ''}
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('ExternalFile', ExternalFileSchema, 'ExternalFile');