module.exports = {
    // core-schemas
    core: require('./core-schemas/resume-core.model'),
    resume: require('./core-schemas/resume-gen.model'),
    placeholder: require('./core-schemas/resume-placeholder.model'),
    otherSource: require('./core-schemas/resume-other-source.model'),
    dropboxRef: require('./core-schemas/resume-dropbox-ref.model'),
    driveRef: require('./core-schemas/resume-drive-ref.model'),
    // specific details schemas
    design: require('./core-schemas/design.model'),
    picture: require('./core-schemas/attachments.model'),
    attachments: require('./core-schemas/attachments.model'),
    // section-schemas
    basics: require('./section-schemas/basics.model'),
    location: require('./section-schemas/location.model'),
    employment: require('./section-schemas/employment.model'),
    volunteer: require('./section-schemas/volunteer.model'),
    education: require('./section-schemas/education.model'),
    awards: require('./section-schemas/awards.model'),
    skills: require('./section-schemas/skills.model'),
    languages: require('./section-schemas/languages.model'),
    interests: require('./section-schemas/interests.model'),
    labels: require('./section-schemas/labels.model'),
    courses: require('./section-schemas/courses.model'),
    strengths: require('./section-schemas/strengths.model'),
    achievements: require('./section-schemas/achievement.model'),
    projects: require('./section-schemas/project.model'),
    technologies: require('./section-schemas/technologies.model'),
    // populate content arrangements
    populateRes: 'basics location profiles employment volunteer education awards publications skills languages interests references affiliations examples governance labels design attachments strengths courses projects technologies highlights achievements'
};