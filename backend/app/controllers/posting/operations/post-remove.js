var Promise = require('bluebird');

var postModel = require('../../../../database').postingSchema;
var userModel = require('../../../../database').userSchema;
var resApi = require('../../creator/index.js');

module.exports.handler = removePostApiHandler;
module.exports.removePost = removePost;

function removePostApiHandler(req, res) {
    console.log('/removePosting/:postId', req.params.postId);
    removePost(req.params.postId).then(function (result) {
        console.log('remove posting ROUTE THEN STATEMENT RESULT:', result);
        res.status(200).json({message: 'post removed', data: result, result: true});
    });
}

function removePost(postId) {
    return postModel.posting
        .findById(postId)
        .exec()
        .then(function (result) {
            var actionArray = [];
            if (result.resume_ref) {
                console.log(result.resume_ref);
                actionArray.push(
                    resApi.removeRes(result.resume_ref, result.userId)
                );
            }
            if (result.image) {
                console.log(result.image);
                actionArray.push(
                    postModel.image
                        .findByIdAndRemove(result.image)
                        .exec()
                );
            }
            if (result.externalResumeRef) {
                console.log(result.externalResumeRef);
                actionArray.push(
                    postModel.externalResumeRef
                        .findByIdAndRemove(result.externalResumeRef)
                        .exec()
                );
            }
            actionArray.push(
                postModel.posting
                    .findByIdAndRemove(postId)
                    .exec()
            );
            return Promise.all(actionArray)
                .then(function (result) {
                    console.log('update posting');
                    return result;
                })
                .catch(function (error) {
                    console.log(error);
                })
        })
};

