var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;


var PostingStatusesSchema = new mongoose.Schema({
    "user_id": {type: String, default: ''},
    "userId" : {type: String, default: ''},
    "aliases": {
        "targeted": {type: String, default: "Targeted"},
        "sent" : {type: String, default: "Send"},
        "interviewing" : {type: String, default: "Interviewing"},
        "offers" : {type: String, default: "Offers"},
        "resolved" : {type: String, default: "Resolved"}
    },
    "targeted" : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Posting' }],
    "sent" : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Posting' }],
    "interviewing": [{ type: mongoose.Schema.Types.ObjectId, ref: 'Posting' }],
    "offers": [{ type: mongoose.Schema.Types.ObjectId, ref: 'Posting' }],
    "resolved": [{ type: mongoose.Schema.Types.ObjectId, ref: 'Posting' }]
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});


module.exports = mongoose.model('PostingStatuses', PostingStatusesSchema, 'PostingStatuses');