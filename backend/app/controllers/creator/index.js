// New Embedded Structure
var create = require('./operations/resume-create');
var createAlt = require('./operations/resume-alt-create');
var retrieve = require('./operations/resume-retrieve');
var sectionUpdate = require('./operations/section-update');
var sectionCreate = require('./operations/section-create');
var update = require('./operations/resume-update');
var updateMeta = require('./operations/resume-update-metadata');
var removeSectionItem = require('./operations/resume-remove-item');
var copy = require('./operations/resume-copy');
var list = require('./operations/resume-list');
var remove = require('./operations/resume-remove');
var setMaster = require('./operations/set-master');
var getMaster = require('./operations/get-master');

var saveImage = require('./operations/attachments.controller').saveImage;
var getImage = require('./operations/attachments.controller').getImage;

module.exports = {
    add: function(req, res){res.status(500).json({message: 'not implemented'})},
    create: create.handler,
    createAlt: createAlt.handler,
    copy: copy.handler,
    copyToPosting: copy.handler,  // confirm this functions correctly
    list: list.handler,
    remove: removeSectionItem.handler,
    retrieve: retrieve.handler,
    retrieveMaster: getMaster.handler,
    sectionCreate: sectionCreate.handler,
    sectionUpdate: sectionUpdate.handler,
    setMaster: setMaster.handler,
    update: update.handler,
    updateMeta: updateMeta.handler,
    removeRes: remove.handler,
    saveImage: saveImage,
    getImage: getImage
};


/*
var add = require('./operation-controllers/resume-add-item');
var update = require('./operation-controllers/resume-update-item');
var sectionUpdate = require('./operation-controllers/section-update');
var remove = require('./operation-controllers/resume-remove-item');
var create = require('./operation-controllers/resume-create');
var retrieve = require('./operation-controllers/resume-retrieve');
var list = require('./operation-controllers/resume-list');
//var sectionCreate = require('./operation-controllers/section-create');
var updateLabel = require('./operation-controllers/resume-update-label');
var removeRes = require('./operation-controllers/resume-remove');
var copy = require('./operation-controllers/resume-copy');
var copyToPosting = require('./operation-controllers/resume-copyToPosting');
var setMaster = require('./operation-controllers/resume-select-master');
var retrieveMaster = require('./operation-controllers/resume-retrieve-master');

var resumeControl = require('./operation-controllers/resume.controller');
var saveImage = require('./operation-controllers/attachments.controller').saveImage;
var getImage = require('./operation-controllers/attachments.controller').getImage;



module.exports = {
    add: add,
    create: createEmbedded,
    copy: copy,
    copyToPosting: copyToPosting,
    list: list,
    remove: removeEmbeded,
    retrieve: retrieveEmbedded,
    retrieveMaster: retrieveMaster,
    sectionCreate: sectionCreateEmbedded,
    sectionCreateOld: resumeControl.create,
    sectionUpdate: sectionUpdateEmbedded,
    setMaster: setMaster,
    update: updateEmbedded,
    updateOld: resumeControl.update,
    updateLabel: updateLabel,
    removeRes: removeRes,
    saveImage: saveImage,
    getImage: getImage
};


 */

