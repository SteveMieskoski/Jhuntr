var dotenv = require('dotenv');
var Promise = require('bluebird');
var fs = require('fs');

var postModel = require('../../../../database').postingSchema;

module.exports.handler = listPostsApiHandler;


function listPostsApiHandler(req, res) {
    console.log('/list/:id', req.params.userId, req.query);
    listPosts(req.params.userId, req.query)
        .then(function (result) {
            res.status(200).json({message: 'posting list retrieved', data: result, result: true});
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).json({error: error, result: false})
        })
}


function listPosts(userId, options) {
    var selection = {label: 1, userId: 1, company: 1, title: 1, description: 1, url: 1, notes: 1, status: 1};
    if (options) {
        for (var prop in options) {
            selection[prop] = options[prop];
        }
    }
    return postModel.posting.find({userId: userId})
        .select(selection)
        .exec()
        .then(function (data) {
            return data
        })
};
