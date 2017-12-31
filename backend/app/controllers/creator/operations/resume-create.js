var Promise = require('bluebird');
var join = Promise.join;


var resSchemas = require('../../../../database/index').resSchema;
var userModel = require('../../../../database/index').userSchema;


module.exports.handler = createResApiHandler;
module.exports.createRes = createRes;

function createResApiHandler(req, res) {
    createResAndUserAdd(req.params.id, 'core')
        .then(function (result) {
            res.status(200).json({message: 'res list retrieved', data: result, result: true});
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).json({error: error, result: false})
        })
}

function createResAndUserAdd(userId, template) {
    return createAttachment()
        .then(function (attachment) {
            return createRes(attachment, userId, template)
        })
        .then(function (resumeData) {
            console.log(resumeData._id, 'resume.controller.retrieve: resume-create | res created for userId: ', userId);
            return userModel.user.findOneAndUpdate({userId: userId}, {$push: {resumes: resumeData._id}}, {new: true});
        })
        .catch(function (err) {
            console.log(err);
            reject(err);
        })
};

function createRes(attachment, userId, template) {
    var newResume = new resSchemas.resume();
   if(attachment) newResume.attachments = attachment._id;
   newResume.userId = userId;
   newResume.internal = true;
    return newResume.save();
}

function createAttachment() {
    var newAttachments = new resSchemas.attachments({img_contentType: 'image/png', image_path: 'assets/mrDefulto.png'});
    return newAttachments.save();
}
