
var Promise = require('bluebird');

var userModels = require('./../../../../database').userSchema;


module.exports = function updateUser(userId, data) {
    return new Promise(function (resolve, reject) {
        userModels.user.findByIdAndUpdate(userId, {$set: data}, {new: true}).exec().then( function (result) {
                resolve(result);
        })
    })
}