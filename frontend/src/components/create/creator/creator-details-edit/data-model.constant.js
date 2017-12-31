'use strict';

export const dataModelConstants = {
    "basics": {
        "firstname": "",
        "lastname": '',
        "label": "",
        "picture": "",
        "email": "",
        "phone": "",
        "website": "",
        "summary": ""
    },
    "location": {
        "address": "",
        "phone": "",
        "postalCode": "",
        "city": "",
        "countryCode": "",
        "state": ""
    },
    "profiles": {
        "show": true,
        "network": "",
        "username": "",
        "url": ""
    },
    "projects": {
        "show": true,
        "name": "",
        "summary": "",
        "details": [{"detail": "", "show": true}],
        "website": "",
        "location": {
            "address": "",
            "phone": "",
            "postalCode": "",
            "city": "",
            "countryCode": "",
            "state": ""
        },
        "startDate": "",
        "endDate": ""
    },
    "employment": {
        "show": true,
        "company": "",
        "position": "",
        "supervisor": "",
        "website": "",
        "location": {
            "address": "",
            "phone": "",
            "postalCode": "",
            "city": "",
            "countryCode": "",
            "state": ""
        },
        "startDate": "",
        "endDate": "",
        "summary": "",
        "details": [{"detail": "", "show": true}],
        "highlights": [],
        "can_contact": true,
        "current": false
    },
    "volunteer": {
        "show": true,
        "organization": "",
        "position": "",
        "website": "",
        "startDate": "",
        "endDate": "",
        "summary": "",
        "highlights": []
    }
    ,
    "education": {
        "show": true,
        "institution": "",
        "location": {
            "address": "",
            "phone": "",
            "postalCode": "",
            "city": "",
            "countryCode": "",
            "state": ""
        },
        "area": "",
        "studyType": "",
        "startDate": "",
        "current": false,
        "graduated": true,
        "endDate": "",
        "gpa": "",
        "courses": []
    }
    ,
    "awards": {
        "show": true,
        "title": "",
        "date": "",
        "awarder": "",
        "summary": "",
        "icon_show": true
    }
    ,
    "strengths": {
        "show": true,
        "label": "",
        "details": "",
        "icon_show": true
    }
    ,
    "courses": {
        "show": true,
        "name": "",
        "summary": ""
    }
    ,
    "achievements": {
        "show": true,
        "label": "",
        "details": "",
        "icon_show": true
    }
    ,
    "publications": {
        "show": true,
        "name": "",
        "publisher": "",
        "releaseDate": "",
        "website": "",
        "summary": ""
    }
    ,
    "skills": {
        "show": true,
        "name": "",
        "level": "",
        "keywords": []
    }
    ,
    "technologies": {
        "show": true,
        "name": "",
        "level": "",
        "keywords": []
    }
    ,
    "languages": {
        "show": true,
        "name": "",
        "level": ""
    }
    ,
    "interests": {
        "show": true,
        "name": "",
        "icon_show": true,
        "keywords": [{"item": ""}]
    }
    ,
    "references": {
        "show": true,
        "name": "",
        "role": "",
        "category": "",
        "private": false,
        "summary": "",
        "contact": {
            "label": "",
            "category": "",
            "value": ""
        }
    }
    ,
    "affiliations": {
        "show": true,
        "role": "",
        "organization": "",
        "url": "",
        "start": "",
        "end": "",
        "general_location": "",
        "summary": "",
        "highlights": [],
        "keywords": []
    },
    "governance": {
        "show": true,
        "role": "",
        "organization": "",
        "url": "",
        "start": "",
        "end": "",
        "general_location": "",
        "summary": "",
        "highlights": [],
        "keywords": []
    },
    "labels": {
        "employment": "Experience",
        "volunteer": "Volunteer",
        "education": "Education",
        "awards": "Awards",
        "publications": "Publications",
        "projects": "Projects",
        "skills": "Skills",
        "languages": "Languages",
        "interests": "Passions",
        "references": "References",
        "affiliations": "Affiliations",
        "examples": "Examples",
        "governance": "Leadership",
        "achievements": "Achievements"

    },
    "design": {
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
            "heading_font": "basic",
            "sub_heading_font": "basic",
            "body_font": "basic",
            "img_show": true,
            "achievement _icon": "fa-diamond",
            "strengths _icon": "fa-diamond",
            "interests_icon": "fa-heart",
            "location_icon": "fa-map-marker",
            "calendar_icon": "fa-calendar",
            "bullet_icon": "fa-circle"
        }

    }
};



