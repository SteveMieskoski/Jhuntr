var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var UserRemindersSchema = new mongoose.Schema({
        posting: {
          type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        content: {
            type: String,
            default: ''
        },
        date: {
            type: Date
        }

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('ReminderData', UserRemindersSchema, 'ReminderData');