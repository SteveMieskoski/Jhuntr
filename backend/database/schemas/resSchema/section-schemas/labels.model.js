var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var LabelsSchema = new Schema({
    "employment": {type: String, default: 'Experience'},
    "volunteer": {type: String, default: 'Volunteer'},
    "education": {type: String, default: 'Education'},
    "awards": {type: String, default: 'Awards'},
    "publications": {type: String, default: 'Publications'},
    "projects": {type: String, default: "Projects"},
    "skills": {type: String, default: 'Skills'},
    "languages": {type: String, default: 'Languages'},
    "interests": {type: String, default: 'Passions'},
    "references": {type: String, default: 'References'},
    "affiliations": {type: String, default: 'Affiliations'},
    "examples": {type: String, default: 'Examples'},
    "governance": {type: String, default: 'Leadership'},
    "achievements": {type: String, default: 'Achievements'},
    "strengths": {type: String, default: 'Strengths'},
    "courses" :  {type: String, default: 'Courses'},
    "technologies" : {type: String, default: 'Technology'}

});

module.exports = mongoose.model('LabelsData', LabelsSchema, 'LabelsData');