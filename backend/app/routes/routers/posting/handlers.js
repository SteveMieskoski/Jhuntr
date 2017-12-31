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

var posting = require('../../../controllers/posting/index');

//module.exports = router;

module.exports.routes = [
    {path: '/addPlainPost/:userId', verb: 'post', handler: posting.addPost, router: 'posting'},
    {path: '/addImage', verb: 'post', handler: posting.addImage, router: 'posting'},
    {path: '/getStatuses/:userId', verb: 'get', handler: posting.getStatuses, router: 'posting'},
    {path: '/getImage/:id', verb: 'post', handler: posting.uploadImage, router: 'posting'},
    {path: '/image/:id', verb: 'post', handler: posting.uploadImage, router: 'posting'},
    {path: '/manualUpload', verb: 'post', handler: posting.uploadImage, router: 'posting',
        middleware: 'uploadImage'},
    {path: '/manualUploadPdf', verb: 'post', handler: posting.pdfUploadParse, router: 'posting'},
    {path: '/removePosting/:postId', verb: 'delete', handler: posting.removePosting, router: 'posting'},
    {path: '/updatePostTaskList/:postId', verb: 'post', handler: posting.updatePostTaskList, router: 'posting'},
    {path: '/updateRemarks/:id', verb: 'post', handler: posting.updateRemarks, router: 'posting'},
    {path: '/updateStatuses', verb: 'post', handler: posting.updateStatuses, router: 'posting'},
    {path: '/uploadResume/:postId', verb: 'post', handler: posting.addExternalResume, router: 'posting'},
    {path: '/update/:id', verb: 'post', handler: posting.updatePost, router: 'posting'},
    {path: '/removeRes/:id/:post', verb: 'delete', handler: posting.listorRemoveRes, router: 'listor'},
    {path: '/list/:userId', verb: 'get', handler: posting.list, router: 'listor'},
    {path: '/list/:userId', verb: 'get', handler: posting.list, router: 'posting'},
    {path: '/retrieveOnePost/:postId', verb: 'get', handler: posting.listorRetrieveOnePost, router: 'listor'},
    {path: '/checkPost/:postId', verb: 'get', handler: posting.listorRetrieveOnePost, router: 'listor'},
    {path: '/jhExtData/:userId/:status', verb: 'post', handler: posting.addPost, router: 'chrome'},
    {path: '/getStatuses/:extUserId', verb: 'get', handler: posting.getStatuses, router: 'chrome'},
    {path: '/list/:userId', verb: 'get', handler: posting.list, router: 'chrome'},
    {path: '/updatePostTaskList/:postId', verb: 'post', handler: posting.updatePostTaskList, router: 'chrome'},
    {path:'/demo/:userId', verb: 'get', handler: posting.demoFunc, router: 'posting'}
];

/*
 module.exports.listorRoutes = [
 {path: '/removeRes/:id/:post', verb: 'delete', handler: listorRemoveRes, router: 'listor'},
 {path: '/list/:id/', verb: 'get', handler: listorList, router: 'listor'},
 {path: '/retrieveOnePost/:id/', verb: 'get', handler: listorRetrieveOnePost, router: 'listor'},
 {path: '/checkPost/:id/', verb: 'get', handler: listorCheckPosting, router: 'listor'}
 ];
 */

function uploadPageImage(req, res) {
    console.log(req.file);
    console.log(pathHelper.root('page_images/'));

    /*   postingController.uploadImage(req.params.id, req.file.path, req.file.mimetype, req.body.label, req.body.url, {tabTitle: req.body.tabTitle})
     .then(function (result) {
     console.log('saved', result._id);
     res.status(200).json({message: 'Image Added', data: result, result: true});
     }); */

};

function getImage(req, res) {
    console.log("Get image route");
    postingController.getImage(req.params.id).then(function (result) {
        var base64 = (result.img_data.toString('base64'));
        res.send(base64);
    });
};



function uploadImage(req, res) {
    // arguments --> (userId, file, path, mimeType, label, url, additional)//, {fileName: req.file.}

    postingController.uploadImage(req.body.id, req.file.path, req.file.mimetype, req.body.label, req.body.url, {fileName: req.file.originalname})
        .then(function (result) {
            res.status(200).json({"success": true, message: 'Image Added', data: result, result: true});
        });
};

function getStatuses(req, res) {
    console.log('/getStatuses/:extUserId for:', req.params.extUserId);
    postingController.getStatuses(req.params.extUserId).then(function (result) {
        res.status(200).json({message: 'current statuses retrieved', data: result, result: true});
    })
};


function updateStatuses(req, res) {
    console.log('/updateStatuses/:statusId for:', req.params.statusId);
    postingController.updateStatuses(req.params.statusId, req.body)
        .then(function (result) {
        res.status(200).json({"success": true, message: 'Statuses Updated', data: result, result: true});
    })
};



function addExternalResume(req, res) {
    // arguments --> (userId, file, path, mimeType, label, url, additional)
    postingController.addExternalResume(req.params.postId, req.file.path, req.file.mimetype, req.body.label, req.body.url, {tabTitle: req.body.tabTitle})
        .then(function (result) {
            console.log('saved', result._id);
            res.status(200).json({message: 'Resume Uploaded', data: result, result: true});
        });
};

function addImage(req, res) {
    // arguments --> (userId, file, path, mimeType, label, url, additional)//, {fileName: req.file.}
    postingController.addImage(req.body.postId, req.file.path, req.file.mimetype, req.body.label, req.body.url, {fileName: req.file.originalname})
        .then(function (result) {
            res.status(200).json({"success": true, message: 'Image Added', data: result, result: true});
        });
};

function pdfUploadParse(req, res) {
    // arguments --> (userId, file, path, mimeType, label, url, additional)
    postingController.pdfUploadParse(req.body.id, req.file.path, req.file.mimetype, req.body.label, req.body.url, {fileName: req.file.originalname})
        .then(function (result) {
            res.status(200).json({"success": true, message: 'Image Added', data: result, result: true});
        });
};

function updateRemarks(req, res) {
    console.log('/updateRemarks/:id for: ', req.params.id);
    // arguments --> (postId)
    postingController.updateRemarks(req.params.id, req.query, req.body).then(function (result) {
        console.log('UPDATE REMARKS ROUTE THEN STATEMENT RESULT:', result);
        res.status(200).json({message: 'remarks updated', data: result, result: true});
    });
};

function removePosting(req, res) {
    console.log('/updateRemarks/:id for: ', req.params.id);
    // arguments --> (postId)
    postingController.removePosting(req.params.postId, req.params.userId).then(function (result) {
        console.log('remove posting ROUTE THEN STATEMENT RESULT:', result);
        res.status(200).json({message: 'post removed', data: result, result: true});
    });
};

function listorCheckPosting(req, res) {
    var startIndex;
    console.log('/list/:id', req.params.id);
    //arguments -> (userId)
    postingController.listorCheckPosting(req.params.id).then(function (result) {
        //   console.log('list', result);
        res.status(200).json({message: 'posting list retrieved', data: result, result: true});
    });
};

function listorRemoveRes(req, res) {
    var startIndex;
    console.log('/list/:id', req.params.id);
    //arguments -> (userId)
    postingController.listorRemoveRes(req.params.id, req.params.post).then(function (result) {
        //   console.log('list', result);
        res.status(200).json({message: 'posting list retrieved', data: result, result: true});
    });
};