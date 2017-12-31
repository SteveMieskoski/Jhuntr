var dotenv = require('dotenv');
var Promise = require('bluebird');
var fs = require('fs');
var mongoose = require('mongoose');

var postingModel = require('../../../../database').postingSchema;

module.exports.handler = updateStatusesApiHandler;
module.exports.updateStatuses = updateStatuses;

function updateStatusesApiHandler(req, res) {
    updateStatuses(req.body.update)
        .then(function (result) {
            res.status(200).json({message: 'statuses updated', data: result, result: true});
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).json({error: error, result: false})
        })
}


function updateStatuses(statuses) {
    return new Promise(function (resolve, reject) {
        var bulkUpdateOps = [];
        var counter = 0;

        // create array of modified posts as objects with id and new status on front end, debounce, and send the array to the server to update

        var bulkUpdateCallback = function (err, r) {
            console.log(r.matchedCount);
            console.log(r.modifiedCount);
            resolve(r);
        };


        statuses.forEach(function (item) {
            bulkUpdateOps.push({
                "updateOne": {
                    "filter": {"_id": item._id},
                    "update": {"$set": {"status": item.status}}
                }
            });
            counter++;

            if (counter % 500 == 0) {
                // Get the underlying collection via the native node.js driver collection object
                postingModel.posting.bulkWrite(bulkUpdateOps, {"ordered": true, w: 1}, bulkUpdateCallback);
                bulkUpdateOps = []; // re-initialize
            }
        });

        if (counter % 500 != 0) {
            postingModel.posting.bulkWrite(bulkUpdateOps, {"ordered": true, w: 1})
                .then(function(result){
                    console.log(result.matchedCount);
                    console.log(result.modifiedCount);
                    resolve(result);
                })
                .catch(function(error){

                })
        }

    })
};
