var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;
var resume = require('./resume-core.model');

// todo change labels and design fields from arrays to just being a single ObjectId reference (see user.model field core_resume)
//var ResumeSchema =
module.exports = resume.discriminator('CoreResume', new Schema({
        //  "user_id": {type: String, default: ''},
        //  "userId": {type: String, default: ''},
        //   "ref_label": {type: String, default: 'My Resume'},
        //   "is_core": {type: Boolean, default: false},
        "attachments": {type: Schema.Types.ObjectId, ref: 'AttachmentsData'},
        //  "associated_postings": [{type: Schema.Types.ObjectId, ref: 'Posting'}],  // use a query on Postings instead
        "resume_ref": {type: String, default: ''},
        "pdf_ref": {type: String, default: ''},
        "template_ref": {type: String, default: 'core'},

        "labels": {
            "employment": {type: String, default: 'Experience'},
            "volunteer": {type: String, default: 'Volunteer'},
            "education": {type: String, default: 'Education'},
            "awards": {type: String, default: 'Awards'},
            "projects": {type: String, default: "Projects"},
            "skills": {type: String, default: 'Skills'},
            "languages": {type: String, default: 'Languages'},
            "interests": {type: String, default: 'Passions'},
            "achievements": {type: String, default: 'Achievements'},
            "strengths": {type: String, default: 'Strengths'},
            "courses": {type: String, default: 'Courses'},
            "technologies": {type: String, default: 'Technology'}
        },
        "design": {
            type: Object, default: {
                "meta": {
                    "outer_template": 'core'
                },
                "inner_templates": {
                    "left": [
                        {section: "education"},
                        {section: "languages"},
                        {section: "achievements"},
                        {section: "interests"}
                    ],
                    "right": [
                        {section: "employment"},
                        {section: "projects"}
                    ]
                },
                "style_options": {
                    "primary_color": 'first-color',
                    "secondary_color": 'second-color',
                    "heading_font": 'basic',
                    "body_font": 'basic',
                    "sub_heading_font": 'basic',
                    "background": 'background-design.svg',
                    "background_name": '',
                    "background_display": 'honey-background',
                    "style": 'core_template',
                    "img_show": true,
                    "achievement_icon": "fa-diamond",
                    "strengths_icon": "fa-diamond",
                    "interests_icon": "fa-heart",
                    "location_icon": "fa-map-marker",
                    "calendar_icon": "fa-calendar",
                    "bullet_icon": "fa-circle"
                }
            }
        },
        "basics": {
            type: Object, default: {
                "firstname": '',
                "lastname": '',
                "label": '',
                "picture": '',
                "email": '',
                "email_icon": 'fa-at',
                "phone": '',
                "phone_icon": 'fa-phone',
                "location": '',
                "location_icon": 'fa-map-marker',
                "location_show": true,
                "website": '',
                "website_icon": 'fa-link',
                "website_show": true,
                "summary": ''
            }
        },
        "employment": {
            type: Array, default: [{
                "index": 0,
                "show": true,
                "company": '',
                "position": '',
                "supervisor": '',
                "website": '',
                "city": '',
                "period": '',
                "summary": '',
                "details": [{
                    "detail": '',
                    "show": true
                }]
            }]
        },
        "volunteer": {
            type: Array, default: [{
                "index": 0,
                "show": true,
                "organization": '',
                "position": '',
                "website": '',
                "startDate": '',
                "endDate": '',
                "summary": '',
                "details": [{
                    "detail": '',
                    "show": true
                }]
            }]
        },
        "education": {
            type: Array, default: [{
                "index": 0,
                "show": true,
                "institution": '',
                "area": '',
                "studyType": '',
                "startDate": '',
                "gpa_show": true,
                "gpa": '',
                "gpaScale": ''
            }]
        },
        "awards": {
            type: Array, default: [{
                "index": 0,
                "show": true,
                "title": '',
                "date": '',
                "awarder": '',
                "summary": '',
                "icon_show": true,
                "icon": "fa-diamond",
            }]
        },
        "skills": {
            type: Array, default: [{
                "index": 0,
                "show": true,
                "name": '',
                "level": 'level-5',
            }]
        },
        "languages": {
            type: Array, default: [{
                "index": 0,
                "show": true,
                "language": '',
                "fluency": '',
                "icon_on": "fa-circle",
                "icon_off": "fa-circle-o",
                "level_one": true,
                "level_two": false,
                "level_three": false,
                "level_four": false,
                "level_five": false
            }]
        },
        "interests": {
            type: Array, default: [{
                "index": 0,
                "show": true,
                "name": '',
                "icon_show": true,
                "icon": "fa-heart",
                "summary": ''
            }]
        },
        "achievements": {
            type: Array, default: [{
                "index": 0,
                "show": true,
                "label": '',
                "icon_show": true,
                "icon": "fa-diamond",
                "details": ''
            }]
        },
        "strengths": {
            type: Array, default: [{
                "index": 0,
                "show": true,
                "label": '',
                "icon_show": true,
                "icon": 'fa-diamond',
                "details": ''
            }]
        },
        "courses": {
            type: Array, default: [{
                "index": 0,
                "show": true,
                "name": '',
                "summary": '',
            }]
        },
        "projects": {
            type: Array, default: [{
                "index": 0,
                "show": true,
                "name": '',
                "summary": '',
                "city": '',
                "details": [{
                    "detail": '',
                    "show": true
                }],
                "website": '',
                "period": ''
            }]
        },
        "technologies": {
            type: Array, default: [{
                "index": 0,
                "show": true,
                "name": ''
            }]
        }
    }, {
        discriminatorKey: '_kind',
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
));


//module.exports = mongoose.model('CoreResume', ResumeSchema, 'CoreResume');