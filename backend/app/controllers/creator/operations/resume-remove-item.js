var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Promise = require('bluebird');

var models = require('../../../../database/index').resSchema;


module.exports.handler = removeSectionItemApiHandler;
module.exports.removeSectionItem = removeSectionItem;

function removeSectionItemApiHandler(req, res) {
    console.log('/remove/:id', req.params.id);
    removeSectionItem(req.params.id, req.body)
        .then(function (result) {
            res.status(200).json({message: 'item removed', data: result, result: true});
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).json({error: error, result: false})
        })
}


function removeSectionItem(resId, updateData) {
    return new Promise(function (resolve, reject) {
        console.log('create section: ', section);
        console.log('add start 1');

        //  models.resume.findById(resId)
        //    .exec()
        //    .then(function (results) {
        //  if(results[section].length)
        //   var newIndex = results[section].length;
        //    var sectionAddition = {};

        var update = {$pull: updateData};
        var options = {new: true};
        models.resume.findByIdAndUpdate(resId, update, options)
            .then(function (result) {
                console.log('section remove', result);
                //resolve(result[section][result[section].length -1]);
                resolve(result);
            })
            .catch(function (err) {
                console.log('section create', err);
                reject(err);
            });
        //  })
        //   .catch(function (err) {
        //       console.log('sction create error', err);
        //      reject(err);
        //   })

    })
};


/*
 console.log('remove item start');
 for (var prop in updateData) {
 controllers[prop].remove(updateData, resId).then(function (result) {
 console.log(prop +' removed',result);
 resolve(result);
 }).catch(function(err){
 console.log(prop +' remove error', err);
 reject(err);
 });
 }
 */

























