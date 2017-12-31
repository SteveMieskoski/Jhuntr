var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var UserTasksSchema = new mongoose.Schema({
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
    priority: {
        type: Number,
        default: 1000
    },
    complete: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('TaskData', UserTasksSchema, 'TaskData');