var express = require('express');
var multer = require("multer");
var Promise = require('bluebird');
var fs = require('fs');
var pathHelper = require('../../../utils/path-helper');
var path = require('path');
console.log(pathHelper.root('public', 'image/'));

//var uploader = require('./util/multer.setup');
/*
 var multerStorage = multer.diskStorage({
 destination: function(req, file, cb){
 cb(null, pathHelper.root('page_images/'))
 },
 filename: function(req, file, cb){
 var datetimestamp = Date.now();
 cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
 }

 });


 var upload = multer({ //multer settings
 storage: multerStorage,
 fileFilter: fileFilter
 }).single('file');
 */

//var upload = uploader.single('file');

var postingController = require('../../../controllers/posting/index');

//module.exports = router;


module.exports.image = function (req, res) {
    console.log(pathHelper.root('page_images/'));
    postingController.uploadImage(req.params.id, req.file.path, req.file.mimetype, req.body.label, req.body.url, {tabTitle: req.body.tabTitle})
        .then(function (result) {
            console.log('saved', result._id);
            res.status(200).json({message: 'Image Added', data: result, result: true});
        });
};

module.exports.getImage = function (req, res) {
    console.log("Get image route");
    postingController.getImage(req.params.id).then(function (result) {
        var base64 = (result.img_data.toString('base64'));
        res.send(base64);
    });
};

module.exports.update = function (req, res) {
    postingController.updatePost(req.params.id, req.body).then(function (result) {
        res.status(200).json({message: 'posting updated', data: result, result: true});
    });
};

module.exports.manualUpload = function (req, res) {
    // arguments --> (userId, file, path, mimeType, label, url, additional)//, {fileName: req.file.}
    postingController.uploadImage(req.body.id, req.file.path, req.file.mimetype, req.body.label, req.body.url, {fileName: req.file.originalname})
        .then(function (result) {
            res.status(200).json({"success": true, message: 'Image Added', data: result, result: true});
        });
};

module.exports.getStatuses = function (req, res) {
    console.log('/getStatuses/:statusId for:', req.params.statusId);
    postingController.getStatuses(req.params.statusId).then(function (result) {
        res.status(200).json({message: 'current statuses retrieved', data: result, result: true});
    })
};

module.exports.updateStatuses = function (req, res) {
    console.log('/updateStatuses/:statusId for:', req.params.statusId);
    postingController.updateStatuses(req.params.statusId, req.body).then(function (result) {
        res.status(200).json({"success": true, message: 'Statuses Updated', data: result, result: true});
    })
};

module.exports.updatePostTaskList = function (req, res) {
    console.log('/updatePostTaskList/:userId/:postId', req.params.userId, req.params.postId);
    postingController.updatePostTaskList(req.params.userId, req.params.postId, req.body).then(function (result) {
        res.status(200).json({"success": true, message: 'Task List Updated', data: result, result: true});
    })
};

module.exports.addPlainPost = function (req, res) {
    console.log('/addPlainPost/::userId for: ', req.params.userId);
    postingController.addPost(req.params.userId, req.params.status, req.body).then(function (result) {
        res.status(200).json({"success": true, message: 'Plain Post Created', data: result, result: true});
    })
};

module.exports.uploadResume = function (req, res) {
    // arguments --> (userId, file, path, mimeType, label, url, additional)
    postingController.addExternalResume(req.params.postId, req.file.path, req.file.mimetype, req.body.label, req.body.url, {tabTitle: req.body.tabTitle})
        .then(function (result) {
            console.log('saved', result._id);
            res.status(200).json({message: 'Resume Uploaded', data: result, result: true});
        });
};

module.exports.addImage = function (req, res) {
    // arguments --> (userId, file, path, mimeType, label, url, additional)//, {fileName: req.file.}
    postingController.addImage(req.body.postId, req.file.path, req.file.mimetype, req.body.label, req.body.url, {fileName: req.file.originalname})
        .then(function (result) {
            res.status(200).json({"success": true, message: 'Image Added', data: result, result: true});
        });
};

module.exports.manualUploadPdf = function (req, res) {
    // arguments --> (userId, file, path, mimeType, label, url, additional)
    postingController.pdfUploadParse(req.body.id, req.file.path, req.file.mimetype, req.body.label, req.body.url, {fileName: req.file.originalname})
        .then(function (result) {
            res.status(200).json({"success": true, message: 'Image Added', data: result, result: true});
        });
};

module.exports.updateRemarks = function (req, res) {
    console.log('/updateRemarks/:id for: ', req.params.id);
    // arguments --> (postId)
    postingController.updateRemarks(req.params.id, req.query, req.body).then(function (result) {
        console.log('UPDATE REMARKS ROUTE THEN STATEMENT RESULT:', result);
        res.status(200).json({message: 'remarks updated', data: result, result: true});
    });
};

module.exports.removePosting = function (req, res) {
    console.log('/updateRemarks/:id for: ', req.params.id);
    // arguments --> (postId)
    postingController.removePosting(req.params.postId, req.params.userId).then(function (result) {
        console.log('remove posting ROUTE THEN STATEMENT RESULT:', result);
        res.status(200).json({message: 'post removed', data: result, result: true});
    });
};

module.exports.jhExtData = function (req, res) {
    postingController.addPost(req.params.id, req.params.status, req.body)
        .then(function (result) {
            console.log('saved', result._id);
            res.status(200).json({message: 'Image Added', data: result, result: true});
        });
};


module.exports.listorList = function (req, res) {
    var startIndex;
    console.log('/list/:id', req.params.id);
    //arguments -> (userId)
    postingController.listorList(req.params.id, req.query).then(function (result) {
        //   console.log('list', result);
        res.status(200).json({message: 'posting list retrieved', data: result, result: true});
    });
};


module.exports.listorRetrieveOnePost = function (req, res) {
    var startIndex;
    console.log('/list/:id', req.params.id);
    //arguments -> (userId)
    postingController.listorRetrieveOnePost(req.params.id).then(function (result) {
        //   console.log('list', result);
        res.status(200).json({message: 'posting list retrieved', data: result, result: true});
    });
};


module.exports.listorCheckPost = function (req, res) {
    var startIndex;
    console.log('/list/:id', req.params.id);
    //arguments -> (userId)
    postingController.listorCheckPosting(req.params.id).then(function (result) {
        //   console.log('list', result);
        res.status(200).json({message: 'posting list retrieved', data: result, result: true});
    });
};


module.exports.listorRemoveRes = function (req, res) {
    var startIndex;
    console.log('/list/:id', req.params.id);
    //arguments -> (userId)
    postingController.listorRemoveRes(req.params.id, req.params.post).then(function (result) {
        //   console.log('list', result);
        res.status(200).json({message: 'posting list retrieved', data: result, result: true});
    });
};