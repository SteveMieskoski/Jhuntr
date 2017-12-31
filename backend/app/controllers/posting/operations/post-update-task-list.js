var dotenv = require('dotenv');
var Promise = require('bluebird');
var fs = require('fs');

var postingModel = require('../../../../database').postingSchema;

module.exports.handler = updatePostTaskListApiHandler;
module.exports.updatePostTaskList = updatePostTaskList;

function updatePostTaskListApiHandler(req, res) {
    console.log('/updatePostTaskList/:postId', req.params.postId);
    updatePostTaskList(req.params.postId, req.body)
        .then(function (result) {
            res.status(200).json({"success": true, message: 'Task List Updated', data: result, result: true});
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).json({error: error, result: false})
        })
}

function updatePostTaskList(postId, tasks) {
        var update = {$set: tasks};
        var options = {new: true};
        return postingModel.posting.findByIdAndUpdate(postId, update, options)
            .exec()
            .then(function (result) {
                return result
            })
            .catch(function (err) {
                console.log('ERROR updating core posting task list', err);
                return err;
            });
};