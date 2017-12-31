var dotenv = require('dotenv');
var Promise = require('bluebird');
var fs = require('fs');

var postingModel = require('../../../../database').postingSchema;


module.exports.handler = retrievePostApiHandler;
module.exports.retrievePost = retrievePost;

function retrievePostApiHandler(req, res) {
    console.log('/retrieveOnePost/:postId', req.params.postId);
    retrievePost(req.params.postId)
        .then(function (result) {
            res.status(200).json({message: 'post retrieved', data: result, result: true});
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).json({error: error, result: false})
        });
}


function retrievePost(postId) {
    return postingModel.posting
        .findById(postId)
        .exec()
        .then(function (data) {
            console.log('retrieveList data');
            return data;
        })
        .catch(function (err) {
            console.log('retrieve error', err);
        })
};
