var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = require('bluebird');
var fs = require('fs');

var userModel = require('./../../../../database').userSchema;


module.exports = function(taskId, data, options){
    return new Promise(function(resolve, reject){
        var updateOptions = {new: true};
        var update = {$set: data};
        userModel.reminders.findByIdAndUpdate(taskId, update, updateOptions )
            .exec()
            .then(function(result){
                resolve(result);
            })

    })
};
