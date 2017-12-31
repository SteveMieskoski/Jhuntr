var attachments = require('../../../../database').resSchema.attachments;
var resModels = require('../../../../database').resSchema;
var dotenv = require('dotenv');
var helper = require('../../../utils/path-helper');
var Promise = require('bluebird');
var fs = require('fs');

dotenv.load();


/**
 *  NOTE: current hard save of files is intended as a temporary solution to allow the implementation functionality in view of difficulties encountered when retrieving files from mongodb & gridfs.
 *
 */


module.exports.saveImage = saveImage;
module.exports.getImage = getImage;

function create(req){
    if(req.file){
        var imageData = fs.readFileSync(req.file.path);
        var newAttachments = new attachments({img_data: imageData , img_contentType: req.file.mimetype, image_path: req.file.path});
        return newAttachments.save();
    } else {
        return Promise.reject(new Promise.OperationalError('improper file type or no file uploaded'))
    }
}

function saveImage(resId, path, mimeType) {
    return new Promise(function(resolve, reject){
        console.log('path', path);

            var resData = resModels.resume.find({_id: resId});
           return resData.exec().then(function (info) {
               console.log('info', info);
               console.log(info[0].attachments);
                    var imageData = fs.readFileSync(path);
                    var recordUpdateData = {img_data: imageData , img_contentType: mimeType, image_path: path};
                    var options = {new: true};
                    var updateAttachments = attachments.findByIdAndUpdate(info[0].attachments, recordUpdateData, options);
                   return updateAttachments.exec().then(function (result) {
                       resolve(result);
                    });
            }).catch(function (err) {
                console.log('retrieve error', err)
            });
    })
}

function getImage(attachmentId){
    console.log(attachmentId);
    var imageQuery = attachments.findById(attachmentId);
   return imageQuery.exec();
}
