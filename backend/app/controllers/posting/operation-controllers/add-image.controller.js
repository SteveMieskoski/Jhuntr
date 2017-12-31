var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
var dotenv = require('dotenv');
var Promise = require('bluebird');
var fs = require('fs');


var postingModel = require('../../../../database').postingSchema;
var image = require('../../../../database').postingSchema.image;
var helper = require('../../../utils/path-helper');


/**
 *  NOTE: current hard save of files is intended as a temporary solution to allow the implementation functionality in view of difficulties encountered when retrieving files from mongodb & gridfs.
 *
 *  image upload error { [Error: ENOENT: no such file or directory, open '/media/sysadmin/DRV_VOL1_2ndPt2/backend/page_images/file-1490783107300.png']
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: '/media/sysadmin/DRV_VOL1_2ndPt2/backend/page_images/file-1490783107300.png',
  storageErrors: [] }
 *
 */
function  blobToBase64(blob, cb) {
    var reader = new FileReader();
    reader.onload = function() {
        var dataUrl = reader.result;
        var base64 = dataUrl.split(',')[1];
        cb(base64);
    };
    reader.readAsDataURL(blob);
};

function create(path, mimeType, label, url) {
    if (path) {
        var imageData = fs.readFileSync(path);
        var newImage = new postingModel.image({image_data: imageData, path: path, contentType: mimeType});
        return newImage.save();
    } else {
        return Promise.reject(new Promise.OperationalError('improper file type or no file uploaded'))
    }
}


module.exports = function saveImage(postingId, path, mimeType, label, url, additional) {
    return new Promise(function (resolve, reject) {
        var query;
        var update;
        var options;
        var addPosting;
        var useLabel;
        var useUrl;

        if(additional){
            if(additional.hasOwnProperty('tabTitle')){
                useLabel = label.length > 0 ? label : additional.tabTitle;
            }
        } else {
            useLabel = label.length > 0 ? label : "uploaded Post " + Date.now();
        }
        useUrl = url.length > 1 ? url : 'none';
        create(path, mimeType, useLabel, useUrl).then(function (ImageData) {

            console.log('POSTING DATA', ImageData);
            console.log('PostingId', postingId);
            update = {$set: {image: ImageData._id}};
            options = {new: true};
            addPosting = postingModel.posting.findByIdAndUpdate(postingId, update, options);
            addPosting.exec().then(function (data) {
                resolve(data);
            }).catch(function (err) {
                console.log('retrieve error', err);
                reject(err);
            }).catch(function (err) {

            })
        })
    })
}