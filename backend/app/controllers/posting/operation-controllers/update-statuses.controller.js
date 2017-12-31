var dotenv = require('dotenv');
var Promise = require('bluebird');
var fs = require('fs');

var postingModel = require('../../../../database').postingSchema;

module.exports = function(statusesId, statuses) {
    return new Promise(function (resolve, reject) {
        var query;
        var update;
        var options;
        var addPosting;
        var addStatus;
        var updateStatuses;

        // create array of modified posts as objects with id and new status on front end, debounce, and send the array to the server to update

        var bulk = postingModel.posting.collection.initializeOrderedBulkOp();
        var counter = 0;
        var bulkUpdate = [];
        statuses.forEach(function(item){
            bulk
                .find({"_id": item.id})
                .updateOne({$set: {status: item.status}})
            counter++;

        });

   /*     bulk.execute(function(err, r) {
            // do something with the result
            bulk = Model.collection.initializeOrderedBulkOp();
            counter = 0;
        }); */


        update = {$set: statuses};
        options = {new: true};
        addStatus = postingModel.statuses.findByIdAndUpdate(statusesId, update, options);
        addStatus.populate(postingModel.statusesPopulation).exec().then(function (data) {
            resolve(data);
        }).catch(function (err) {
            console.log('retrieve error', err);
            reject(err);
        }).catch(function (err) {
        })
    })
};
/*
module.exports = function(statusesId, statuses) {
    return new Promise(function (resolve, reject) {
        var query;
        var update;
        var options;
        var addPosting;
        var addStatus;
        var updateStatuses;


        update = {$set: statuses};
        options = {new: true};
        addStatus = postingModel.statuses.findByIdAndUpdate(statusesId, update, options);
        addStatus.populate(postingModel.statusesPopulation).exec().then(function (data) {
            resolve(data);
        }).catch(function (err) {
            console.log('retrieve error', err);
            reject(err);
        }).catch(function (err) {
        })
    })
};
*/