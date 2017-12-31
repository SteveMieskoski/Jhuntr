var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var PostingSchema = new mongoose.Schema({
    "userId" : {type: String, default: ''},
    'image': {type: Schema.Types.ObjectId, ref: 'PostImage'},
    "externalResumeDoc": {type: Schema.Types.ObjectId, ref: 'PostImage'},
    "externalResumeRef": {type: String, default: ''},
    "resume_label" : {type: String, default: ''},  //  Label of Associated Resume (external or internal)
    "resume_ref": {type: String, default: ''}, // should be ObjectId Ref
    "template_ref": {type: String, default: ''}, //should be ObjectId Ref
    "label": {type: String, default: ''},
    "userStatus": {type: String, default: ''},
    "status": {type: String, default: ''},
    "url": {type: String, default: ''},
    "company": {type: String, default: ''},
    "companyAltName": {type: String, default: ''},
   // "company_city" : {type: String, default: ''},
   // "company_address": {type: String, default: ''},
    "company_url": {type: String, default: ''},
    "title": {type: String, default: ''},
    "location": {type: String, default: ""},
    "suite" : {type: String, default: ''},
    "number" : {type:String, default: ''},
    "street" : {type: String, default: ''},
    "zip": {type: String, default: ''},
    "city": {type: String, default: ''},
    "state": {type: String, default: ''},
    "region": {type: String, default: ''},
    "lat": {type: Number},
    "long": {type: Number},
    "locationId": {type: String, default: ''},
    "logo" : {type: String, default: ""},
    "notes": {type: String, default: ""},
    "dateApplied": {type: String, default: ''},
    "postingTime": {type: String, default: ''},
    "source": {type: String, default: ''},
    "open": {type: Boolean, default: true},
    "rating": {type: String, default: ''},
    "skillsDesired": {type: Array, default: []},
    "skillsPossessed": {type: Array, default: []},
    "contactLabel": {type: String, default: ''},
    "contactDetail": {type: String, default: ''},
    "description": {type: String, default: ''},
    "tasks": {type: Array, default: []},
    "reminders": [{
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
    }]
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});


PostingSchema.virtual("getStatusArrays").get(function (cb) {
    var status_Array = {
        targeted: [],
        sent: []
    };
    status_Array.targeted = this.model('Posting').find({status: "Targeted"});
    status_Array.sent = this.model('Posting').find({status: "Sent"});
    return status_Array;
});

module.exports = mongoose.model('Posting', PostingSchema, 'Posting');