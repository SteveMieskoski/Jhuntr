var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    "user_id" : { type: String, required: true},
    "userId" : {type: String, required: true},
    "user_name": { type: String, default: '' },
    "skills": {type: Array, default: []},
    "posting_statuses" : {type: mongoose.Schema.Types.ObjectId, ref: 'PostingStatuses'},
    "saved_postings": [{ type: mongoose.Schema.Types.ObjectId, ref: 'Posting' }],
    "core_resume": {type: mongoose.Schema.Types.ObjectId, ref: 'CoreResume'},
    "resumes": [{type: mongoose.Schema.Types.ObjectId, ref: 'CoreResume'}],
    "tasks" : [{type: mongoose.Schema.Types.ObjectId, ref: 'TaskData'}],
    "reminders" : [{type: mongoose.Schema.Types.ObjectId, ref: 'ReminderData'}],
    "role": {type: Array, default: ['user']}
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('Users', UserSchema, 'Users');