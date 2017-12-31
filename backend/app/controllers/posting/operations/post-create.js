var dotenv = require('dotenv');
var Promise = require('bluebird');
var fs = require('fs');

var userModel = require('../../../../database').userSchema;
var postingModel = require('../../../../database').postingSchema;
var helper = require('../../../utils/path-helper');

module.exports.handler = createPostApiHandler;
module.exports.createPost = createPost;

function createPostApiHandler(req, res) {
    console.log('/addPlainPost/:userId for: ', req.params.userId);
    createPost(req.params.userId, req.body)
        .then(function (result) {
            res.status(200).json({"success": true, message: 'Plain Post Created', data: result, result: true});
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).json({error: error, result: false})
        })
}


function createPost(userId, postData) {
        var newPosting = new postingModel.posting(postData);
        newPosting.userId = userId;
      return  newPosting.save();

};