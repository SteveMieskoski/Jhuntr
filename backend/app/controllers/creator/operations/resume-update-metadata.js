var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Promise = require('bluebird');
var join = Promise.join;
var assert = require('assert');

var models = require('../../../../database/index').resSchema;

module.exports.handler = updateResMetadataApiHandler;
module.exports.updateResMetadata = updateResMetadata;

function updateResMetadataApiHandler(req,res){
    console.log('/updateMeta/:id', req.params.id);
    updateResMetadata(req.params.id, req.body)
        .then(function (result) {
            res.status(200).json({message: 'res Metadata updated', data: result, result: true});
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).json({error: error, result: false})
        })
}


function updateResMetadata(resId, updateData) {
    console.log('Update Metadata');
    return new Promise(function (resolve, reject) {
        console.log('add start 1');
        console.log(updateData);

        var update = {
            $set: {
                ref_label: updateData.ref_label
            }
        };
        //  var update = {$set: {updateData}};
        // var options = {new: true, upsert: false, setDefaultsOnInsert: false};
        var options = {new: true};
        models.resume.findByIdAndUpdate(resId, update, options)
            .then(function (result) {
                console.log('MetaData Update Result: ', result);
                //resolve(result[section][result[section].length -1]);
                resolve(result);
            })
            .catch(function (err) {
                console.log('MetaData Update Error: ', err);
                reject(err);
            });

    })
}