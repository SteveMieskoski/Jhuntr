var dotenv = require('dotenv');
var Promise = require('bluebird');
var fs = require('fs');
var mongoose = require('mongoose');

var postingModel = require('../../../../database').postingSchema;

module.exports.handler = updateStatusApiHandler;
module.exports.updateStatus = updateStatus;
/*
function updateStatusApiHandler(req, res) {
    updateStatus(req.params.userId, req.body)
        .then(function (result) {
            res.status(200).json({message: 'status updated', data: result, result: true});
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).json({error: error, result: false})
        })
}


function updateStatus(id, statuses) {
    return new Promise(function (resolve, reject) {
        postingModel.posting.findOneAndUpdate({_id: status._id }, {$set: {status: status.status}}).exec().then(function(result){resolve(result)})

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

*/
