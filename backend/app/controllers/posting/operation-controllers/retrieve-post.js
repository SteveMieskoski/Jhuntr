var dotenv = require('dotenv');
var Promise = require('bluebird');
var fs = require('fs');

var posting = require('../../../../database').postingSchema.posting;



module.exports = function retrieveList(postId) {
    return new Promise(function (resolve, reject) {
        var query;
        var update;
        var options;
        var getPostings;
        getPostings = posting.findById(postId).populate('image');
        getPostings.exec().then(function (data) {
              console.log('retrieveList data');
            resolve(data);
        }).catch(function (err) {
            console.log('retrieve error', err);
            reject(err);
        }).catch(function (err) {

        })
    })
};
