

var Promise = require('bluebird');

var userModel = require('./../../../../database').userSchema;

function createReminder(data) {
    var newReminders = new userModel.reminders(data);
    return newReminders.save();
}


module.exports ={
    add: function (userId, data, additional) {
        return new Promise(function (resolve, reject) {
            var query;
            var update;
            var options;
            var addPosting;

            createReminder(data).then(function (result) {
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
    },
    update: function(reminderId, data, options){
        return new Promise(function(resolve, reject){
            var updateOptions = {new: true};
            var update = {$set: data};
            userModel.reminders.findByIdAndUpdate(reminderId, update, updateOptions )
                .exec()
                .then(function(result){
                    resolve(result);
                })

        })
    },
    delete: function(reminderId, options){
        return new Promise(function(resolve, reject){
            userModel.reminders.findByIdAndRemove(reminderId)
                .exec()
                .then(function(result){
                    resolve(result);
                })

        })
    }
};
