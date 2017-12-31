var mongoose = require('mongoose');
var Promise = require('bluebird');
var fs = require('fs');

var userModel = require('../../../../database').userSchema;
var posting = require('../../../../database').postingSchema.posting;
var image = require('../../../../database').postingSchema.image;
var helper = require('../../../utils/path-helper');

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
function  blobToBase64(blob, cb) {
    var reader = new FileReader();
    reader.onload = function() {
        var dataUrl = reader.result;
        var base64 = dataUrl.split(',')[1];
        cb(base64);
    };
    reader.readAsDataURL(blob);
};
/*
function create(path, mimeType, label, url) {
    if (path) {
        var imageData = fs.readFileSync(path);
     //   var imageData = new Buffer(fs.readFileSync(path)).toString("base64");
        var newImage = new image({image_data: imageData, path: path, contentType: mimeType});
        return newImage.save().then(function (imageDoc) {
            var newPosting = new posting({image: imageDoc._id, url: url, status: 'initial', label: label});
            return newPosting.save()
        });
    } else if(){
        return Promise.reject(new Promise.OperationalError('improper file type or no file uploaded'))
    }
}
*/
function create(path, mimeType, label, url) {
    if (path) {
        //   var imageData = new Buffer(fs.readFileSync(path)).toString("base64");
        var newImage = new image({image_data: path, path: '', contentType: mimeType});
        return newImage.save().then(function (imageDoc) {
            var newPosting = new posting({image: imageDoc._id, url: url, status: 'initial', label: label});
            return newPosting.save()
        });
    } else {
        return Promise.reject(new Promise.OperationalError('improper file type or no file uploaded'))
    }
}



exports.handler = function saveImageHandler(req, res){
    saveImage(req.params.id, req.file.buffer, req.file.mimetype, req.body.label, req.body.url, {tabTitle: req.body.tabTitle})
        .then(function (result) {
            console.log('saved', result);
            res.status(200).json({message: 'Image Added', data: result, result: true});
        });
};

module.exports.default = saveImage;

 function saveImage(userId, path, mimeType, label, url, additional) {
    return new Promise(function (resolve, reject) {
        var query;
        var update;
        var options;
        var addPosting;
		var useLabel;
        var useUrl;
        var creator;

        if(additional){
            if(additional.hasOwnProperty('tabTitle')){
				useLabel = label.length > 0 ? label : additional.tabTitle;
            }
		} else {
            useLabel = label.length > 0 ? label : "uploaded Post " + Date.now();
        }
        useUrl = url.length > 1 ? url : 'none';

       /* if(additional.hasOwnProperty('buffer')){
            creator =
        } else {
           creator = create(path, mimeType, useLabel, useUrl)

        } */


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



/*
 process:
 recieve image data
 check # of posts user has.
 assuming above is ok,
 create new post
 associate image and data to newly created post.
 */

//Original working between block comments
/*
function create(path, mimeType, label, url) {
    if (path) {
        var imageData = fs.readFileSync(path);
        var newImage = new image({image_data: imageData, path: path, contentType: mimeType});
       return newImage.save().then(function (imageDoc) {
            var newPosting = new posting({image: imageDoc._id, url: url, status: 'initial', label: label});
            return newPosting.save()
        });
    } else {
        return Promise.reject(new Promise.OperationalError('improper file type or no file uploaded'))
    }
}


module.exports =function saveImage(userId, path, mimeType, label, url, additional) {
    return new Promise(function (resolve, reject) {
        var query;
        var update;
        var options;
        var addPosting;

        var useLabel = label.length > 0 ? label : additional.tabTitle;
        create(path, mimeType, useLabel, url).then(function (postingData) {
            query = {user_id: userId};
            update = {$push: {saved_postings: postingData._id}};
            options = {new: true};
            addPosting = user.findOneAndUpdate(query, update, options);
            addPosting.exec().then(function (data) {
                console.log(data);
                resolve(data);
            }).catch(function (err) {
                console.log('retrieve error', err);
                reject(err);
            }).catch(function (err) {

            })
        })
    })
}

*/
function getImage(imageId) {
    console.log(imageId);
    var imageQuery = image.findById(imageId);
    return imageQuery.exec();
    //  function (err, doc) {
    //      if (err) return next(err);

    //  });
}


//console.log(req.file);
// var userQuery = user.findById(req.params.id);
// userQuery.exec().then(function (userData) {
//     if (userData.core_resume) {
// console.log(userData);
//      console.log('path', path);

//  var userData = user.find({user_id: userId});
//   return userData.exec().then(function (userContent) {


//  res.status(200).json({message: 'Attachments field created', data: data, result: true});

//

//  res.status(500).json({message: 'Upload Failed', data: {error: err, status_code: 1}, result: true});


//}).catch(function (err) {
//      console.log('retrieve error', err)
//  });
//   }

//  })
/* //  console.log('info', info);
 //  console.log(info[0].attachments);
 var imageData = fs.readFileSync(path);
 var recordUpdateData = {img_data: imageData , img_contentType: mimeType, image_path: path};
 var update = {$set: recordUpdateData};
 var options = {new: true};
 var updateAttachments = attachments.findByIdAndUpdate(info[0].attachments, recordUpdateData, options);
 return updateAttachments.exec().then(function (result) {
 resolve(result);
 });
 //      } else {

 }); */
//    }


//  console.log(info);