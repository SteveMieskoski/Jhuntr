var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;
var resume = require('./resume-core.model');

// todo change labels and design fields from arrays to just being a single ObjectId reference (see user.model field core_resume)
//var ResumeSchema =
module.exports = resume.discriminator('DropBoxRefResume', new Schema({
        tag: {type: String, default: ''},
        client_modified: {type: String, default: ''},
        content_hash: {type: String, default: ''},
        id: {type: String, default: ''},
        name: {type: String, default: ''},
        path_display: {type: String, default: ''},
        path_lower: {type: String, default: ''},
        rev: {type: String, default: ''},
        server_modified: {type: String, default: ''},
        size: {type: Number}
    },
    {
        discriminatorKey: '_kind',
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
))
;