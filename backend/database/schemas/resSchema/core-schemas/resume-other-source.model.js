var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;
var resume = require('./resume-core.model');

// todo change labels and design fields from arrays to just being a single ObjectId reference (see user.model field core_resume)
//var ResumeSchema =
module.exports = resume.discriminator('OtherSourceResume', new Schema({
    fileLocation: {type: String, default: ''},
    otherSource: {type: String},
    altName: {type: String, default: ''},
    version: {type: String, default: ''},
    notes: {type: String, default: ''}
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