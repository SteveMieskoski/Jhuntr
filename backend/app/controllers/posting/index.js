var create = require('./operations/post-create');
var update = require('./operations/post-update');
var list = require('./operations/post-list');
var retrieve = require('./operations/post-retrieve');
var remove = require('./operations/post-remove');

var updatePoatTaskList = require('./operations/post-update-task-list');


var getStatusesArrays = require('./operations/statuses-list');
var updateStatusField = require('./operations/statuses-update');

var demo = require('./operations/demo');

module.exports = {
    getImage: function(req, res){res.status(500).json({message: 'not implemented'})},
    updatePost: update.handler,
    uploadImage: function(req, res){res.status(500).json({message: 'not implemented'})},
    updateRemarks: function(req, res){res.status(500).json({message: 'not implemented'})},
    removePosting: remove.handler,
    pdfUploadParse: function(req, res){res.status(500).json({message: 'not implemented'})},
    addImage: function(req, res){res.status(500).json({message: 'not implemented'})},
    addPost: create.handler,
    getStatuses: getStatusesArrays.handler,
    updateStatuses: updateStatusField.handler,
    updatePostTaskList: updatePoatTaskList.handler,
    addExternalResume: function(req, res){res.status(500).json({message: 'not implemented'})},
    // Previously of listor controller
    list: list.handler,
    listorRemoveRes: function(req, res){res.status(500).json({message: 'not implemented'})},
    listorRetrieveOnePost: retrieve.handler,
    listorCheckPosting: function(req, res){res.status(500).json({message: 'not implemented'})},
    demoFunc: demo.handler
};






/*
var saveImage = require('./operation-controllers/receive-file.controller').handler;
var updatePost = require('./operation-controllers/update-post.controller');
var getImageController = require('./operation-controllers/get-image.controller');
var updateRemarks = require('./operation-controllers/update-remarks');

var removePosting = require('./operation-controllers/remove-posting');
var pdfUploadParse = require('./operation-controllers/upload-pdf-manually');
var addImage = require('./operation-controllers/add-image.controller');
var addPostController = require('./operation-controllers/add-post.controller');

var updateStatusesController = require('./operation-controllers/update-statuses.controller');
var getStatusesController = require('./operation-controllers/get-statuses.controller');
var updatePostTaskListController = require('./operation-controllers/update-post-task-list.controller');
var addExternalResumeController = require('./operation-controllers/add-external-resume.controller.js');
// Previously of listor controller
var retrieve = require('./operation-controllers/retrieve-list');
var removeRes = require('./operation-controllers/remove-ref-res-data');
var retrieveOnePost = require('./operation-controllers/retrieve-post');
var checkPosting = require('./operation-controllers/check-posting');

module.exports = {
    getImage: getImageController,
    updatePost: updatePost,
    uploadImage: saveImage,
    updateRemarks: updateRemarks,
    removePosting: removePosting,
    pdfUploadParse: pdfUploadParse,
    addImage: addImage,
    addPost: addPostController,
    getStatuses: getStatusesController,
    updateStatuses: updateStatusesController,
    updatePostTaskList: updatePostTaskListController,
    addExternalResume: addExternalResumeController,
    // Previously of listor controller
    listorList: retrieve,
    listorRemoveRes: removeRes,
    listorRetrieveOnePost: retrieveOnePost,
    listorCheckPosting: checkPosting
};
*/


