var express = require('express');
var router = express.Router();
var multer = require("multer");
var Promise = require('bluebird');
var join = Promise.join;
var fs = require('fs');
var pathHelper = require('../../path-helper');
var Busboy = require('busboy');
var inspect = require('util').inspect;
var os = require('os');
var path = require('path');
console.log(pathHelper.root('public', 'image/') );

var uploader = require('./util/multer.setup');
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

var upload = uploader.single('file');

var postingController = require('./index');

module.exports = router;




router.post('/jhExtData/:id/:status', function(req, res){
    postingController.addPost(req.params.id, req.params.status, req.body)
        .then(function(result){
        console.log('saved', result._id);
        res.status(200).json({message: 'Image Added', data: result, result: true});
    });
});