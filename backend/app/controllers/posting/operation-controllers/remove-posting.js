var Promise = require('bluebird');

var postModel = require('../../../../database').postingSchema;
var userModel = require('../../../../database').userSchema;
var resApi = require('../../creator/index.js');

module.exports = function (postId, userId) {
    return new Promise(function (resolve, reject) {

        var postingContent = postModel.posting.findById(postId);
        postingContent.exec().then(function (result) {
            var actionArray = [];
            if(result.resume_ref){
                actionArray.push(resApi.removeRes(result.resume_ref, userId));
            }
            actionArray.push(userModel.user.findByIdAndUpdate(userId, {$pull: {saved_postings: postId}}).exec());
            actionArray.push(postModel.image.findByIdAndRemove(result.image).exec());
            if(result.details){
                actionArray.push(postModel.details.findByIdAndRemove(result.details).exec());
            }
            if(result.remarks){
                actionArray.push(postModel.remarks.findByIdAndRemove(result.remarks).exec());
            }
            if(result.extras){
                actionArray.push(postModel.extras.findByIdAndRemove(result.extras).exec());
            }
            actionArray.push(postModel.posting.findByIdAndRemove(postId).exec());
            Promise.all(actionArray).then(function (result) {
                    console.log('update posting');
                    resolve(result);
                })
                .catch(function (error) {
                    reject(error);
                })
        })
    })
};
