var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

// todo change labels and design fields from arrays to just being a single ObjectId reference (see user.model field core_resume)
var TemplateSchema = new Schema({
    name: {type: String, default: 'core'},
    photo_option: {type: Boolean, default: true}
    }, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);


module.exports = mongoose.model('TemplateData', TemplateSchema, 'TemplateData');
