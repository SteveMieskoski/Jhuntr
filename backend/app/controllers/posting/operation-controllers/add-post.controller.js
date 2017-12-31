var dotenv = require('dotenv');
var Promise = require('bluebird');
var fs = require('fs');

var userModel = require('../../../../database').userSchema;
var postingModel = require('../../../../database').postingSchema;
var helper = require('../../../utils/path-helper');


module.exports = function addPostController(userId, status, postData) {
    return new Promise(function (resolve, reject) {
        var query;
        var update;
        var options;
        var addPosting;
        var addStatus;
        var updateStatuses;
        var statusToAdd;
        var postDataWithId;


        console.log('INITIAL -->  USERID: ',userId,' STATUS:', status, " DATA:", postData);
        var newPosting = new postingModel.posting(postData);
        newPosting
            .save()
            .then(function (postingData) {
                console.log('postingData, Post saved return data', postingData);
                query = {user_id: userId};
                update = {$push: {saved_postings: postingData._id}};
                options = {new: true};

                addPosting = userModel.user.findOneAndUpdate(query, update, options);
                addPosting
                    .exec()
                    .then(function (data) {
                        console.log('STATUS:', status, "DATA:", data);
                        statusToAdd = {};
                        postData._id = postingData._id;
                        statusToAdd[status] = postData;
                        updateStatuses = {$push: statusToAdd};
                        addStatus = postingModel.statuses.findByIdAndUpdate(data.posting_statuses, updateStatuses, options);
                        addStatus
                            .populate(postingModel.statusesPopulation)
                            .exec()
                            .then(function (result) {
                                console.log(result);
                                resolve(result);
                            })
                            .catch(function (err) {
                                console.log('retrieve error', err);
                                reject(err);
                            })
                    })
                    .catch(function (err) {
                        console.log('retrieve error', err);
                        reject(err);
                    })
                    .catch(function (err) {

                    })
            })

    })
};