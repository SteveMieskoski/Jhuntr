var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var DesignSchema = new Schema({
    "meta": {
        "outer_template": {type: String, default: 'core'}
    },
    "inner_templates" : {
        "left" : [{section: {type: String }}],
        "right" : [{section: {type: String}}]
    },
    "style_options":{
        "primary_color": {type: String, default: 'first-color'},
        "secondary_color": {type: String, default: 'second-color'},
        "heading_font": {type: String, default: 'basic'},
        "body_font": {type: String, default: 'basic'},
        "sub_heading_font" : {type: String, default: 'basic'},
        "background" : {type: String, default: 'background-design.svg'},
        "background_name": {type: String, default: ''},
        "background_display": {type: String, default: 'honey-background'},
        "style" : {type: String, default: 'core_template'},
        "img_show": {type: Boolean, default: true },
        "achievement_icon": {type: String, default: "fa-diamond"},
        "strengths_icon": {type: String, default: "fa-diamond"},
        "interests_icon": {type: String, default: "fa-heart"},
        "location_icon": {type: String, default: "fa-map-marker"},
        "calendar_icon": {type: String, default: "fa-calendar"},
        "bullet_icon":{type: String, default: "fa-circle"}
    }
});

/*
DesignSchema.pre("save",function(next) {
    var i;
    if (this.left.length == 0 && this.right.length == 0){
        var leftDefault = [{section: "src/components/creator/templates/sections/education.html", name: "education"},
            {section: "src/components/creator/templates/sections/languages.html", name: "languages"},
            {section: "src/components/creator/templates/sections/achievements.html", name: "achievement"},
            {section: "src/components/creator/templates/sections/interests.html", name: "interests"}];
        for( i=0; i<leftDefault.length; i++){
            this.left.push(leftDefault[i]);
        }

        var rightDefault = [
            {section: "src/components/creator/templates/sections/employment.html", name: "employment"},
            {section: "src/components/creator/templates/sections/projects.html", name: "projects"}
        ];
        for( i=0; i<rightDefault.length; i++){
            this.right.push(rightDefault[i]);
        }
    }
    next();
});
*/

module.exports = mongoose.model('DesignData', DesignSchema, 'DesignData');