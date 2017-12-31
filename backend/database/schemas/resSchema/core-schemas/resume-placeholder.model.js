var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;
var resume = require('./resume-core.model');

// todo change labels and design fields from arrays to just being a single ObjectId reference (see user.model field core_resume)
//var ResumeSchema =
module.exports = resume.discriminator('PlaceholderResume', new Schema({
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