var dotenv = require('dotenv');
var Promise = require('bluebird');
var fs = require('fs');

var postingModel = require('../../../../database').postingSchema;

module.exports = function updatePostTaskList(userId, postId, tasks) {
    return new Promise(function (resolve, reject) {
        var query;
        var update;
        var options;
        var updatePostingTasks;
        var addStatus;
        var updateStatuses;

        query = {user_id: userId};
        update = {$set: tasks};
        options = {new: true};
            postingModel.posting.findByIdAndUpdate(postId, update, options)
                .exec()
                .then(function (result) {
                    resolve(result);
                })
                .catch(function (err) {
                    console.log('ERROR updating core posting task list', err);
                    reject(err);
                });
    })
};