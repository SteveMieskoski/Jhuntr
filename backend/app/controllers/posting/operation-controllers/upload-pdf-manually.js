var mongoose = require('mongoose');
var dotenv = require('dotenv');
var Promise = require('bluebird');
var fs = require('fs-extra');
var gm = require('gm');

var userModel = require('../../../../database').userSchema;
var posting = require('../../../../database').postingSchema.posting;
var image = require('../../../../database').postingSchema.image;
var helper = require('../../../utils/path-helper');

var PDFImage = require("../util/convert-pdf-image").PDFImage;


module.exports = function convertPdf(userId, path, mimeType, label, url, additional) {
    return new Promise(function (resolve, reject) {
        console.log(userId);
        var out = path.replace('pdf', 'png');
        var cmd = 'identify -format %n ' + path;
        var execSync = require('child_process').execSync;
        var pageCount = parseInt(execSync(cmd).toString().trim());

        var pdfImage = new PDFImage(path);
        var pdfPagePromises = [];
        for (var i = 0; i < pageCount; i++) {
            pdfPagePromises.push(pdfImage.convertPage(i))
        }

        Promise.all(pdfPagePromises).then(function (result) {
            var top = result.shift();
            gm(top)
                .append(result, false)
                .write(out, function (err) {
                    if (err) return console.dir(arguments);
                    saveImage(userId, out, mimeType, label, url, additional)
                        .then(function (saveResult) {
                            fs.remove(top, function (err) {
                                if (err) return console.error(err);
                            });
                            fs.remove(path, function (err) {
                                if (err) return console.error(err);
                            });
                            for(i=0; i<result.length; i++){
                                fs.remove(result[i], function (err) {
                                    if (err) return console.error(err);
                                });
                            }
                            resolve(saveResult);
                        })
                        .catch(function (error) {
                            console.log(error);
                            reject(error);
                        })
                });
        });
    })


}


//dotenv.load();

//Grid.mongo = mongoose.mongo;

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
function blobToBase64(blob, cb) {
    var reader = new FileReader();
    reader.onload = function () {
        var dataUrl = reader.result;
        var base64 = dataUrl.split(',')[1];
        cb(base64);
    };
    reader.readAsDataURL(blob);
};

function create(path, mimeType, label, url) {
    if (path) {
        var imageData = fs.readFileSync(path);
        //   var imageData = new Buffer(fs.readFileSync(path)).toString("base64");
        var newImage = new image({image_data: imageData, path: path, contentType: mimeType});
        return newImage.save().then(function (imageDoc) {
            var newPosting = new posting({image: imageDoc._id, url: url, status: 'initial', label: label});
            return newPosting.save()
        });
    } else {
        return Promise.reject(new Promise.OperationalError('improper file type or no file uploaded'))
    }
}


function saveImage(userId, path, mimeType, label, url, additional) {
    return new Promise(function (resolve, reject) {
        var query;
        var update;
        var options;
        var addPosting;
        var useLabel;
        var useUrl;

        if (additional) {
            if (additional.hasOwnProperty('tabTitle')) {
                useLabel = label.length > 0 ? label : additional.tabTitle;
            }
            if (additional.hasOwnProperty('tabTitle')) {
                useLabel = label.length > 0 ? label : additional.tabTitle;
            }
        }
        useLabel = label.length > 0 ? label : useLabel;
        useUrl = url.length > 1 ? url : 'none';
        create(path, mimeType, useLabel, useUrl).then(function (postingData) {
            console.log('POSTING DATA', postingData);
            console.log('User Id', userId);
            query = {user_id: userId};
            update = {$push: {saved_postings: postingData._id}};
            options = {new: true};
            addPosting = userModel.user.findOneAndUpdate(query, update, options);
            addPosting.exec().then(function (data) {
                // console.log(data);
                resolve(data);
            }).catch(function (err) {
                console.log('retrieve error', err);
                reject(err);
            }).catch(function (err) {

            })
        })
    })
}


