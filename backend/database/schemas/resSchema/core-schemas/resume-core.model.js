var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

// todo change labels and design fields from arrays to just being a single ObjectId reference (see user.model field core_resume)
var ResumeSchema = new Schema({
        "user_id": {type: String, default: ''},
        "userId": {type: String, default: ''},
        "ref_label": {type: String, default: 'My Resume'},
        "is_core": {type: Boolean, default: false},
        "internal": {type: Boolean, default: false}
    }, {
        discriminatorKey: '_kind',
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);


module.exports = mongoose.model('BaseResume', ResumeSchema, 'CoreResume');