



var dotenv = require('dotenv');
var Promise = require('bluebird');
var fs = require('fs');

var userModel = require('./../../../../database').userSchema;


function create(data) {
        var newTask = new userModel.tasks(data);
        return newTask.save();
}


module.exports =function saveImage(userId, data, additional) {
    return new Promise(function (resolve, reject) {
        var query;
        var update;
        var options;
        var addPosting;

        create(data).then(function (result) {
            query = {user_id: userId};
            update = {$push: {tasks: result._id}};
            options = {new: true};
            addPosting = userModel.user.findOneAndUpdate(query, update, options);
            addPosting.exec().then(function (data) {
                console.log(data);
                resolve(result);
            }).catch(function (err) {
                console.log('retrieve error', err);
                reject(err);
            })
        })
    })
};