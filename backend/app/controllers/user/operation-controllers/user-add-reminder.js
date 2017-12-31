

var Promise = require('bluebird');

var userModel = require('./../../../../database').userSchema;

function createTask(data) {
    var newReminders = new userModel.reminders(data);
    return newReminders.save();
}


module.exports =function addTask(userId, data, additional) {
    return new Promise(function (resolve, reject) {
        var query;
        var update;
        var options;
        var addPosting;

        createTask(data).then(function (result) {
            query = {user_id: userId};
            update = {$push: {reminders: result._id}};
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