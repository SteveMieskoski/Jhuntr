var dotenv = require('dotenv');
var Promise = require('bluebird');
var fs = require('fs');

var userModel = require('../../../../database').userSchema;

module.exports = function retrieveList(userId, options) {
    return new Promise(function (resolve, reject) {
        var query;
        var getPostings;
            query = {user_id: userId};
            getPostings = userModel.user.findOne(query).populate(options.field);
            getPostings.exec().then(function (data) {
             //   console.log(data);
                resolve(data);
            }).catch(function (err) {
                console.log('retrieve error', err);
                reject(err);
            }).catch(function (err) {

            })
    })
};
