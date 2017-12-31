var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Promise = require('bluebird');
var join = Promise.join;
var assert = require('assert');

var models = require('../../../../database/index').resSchema;

module.exports.handler = updateResApiHandler;
module.exports.updateRes = updateRes;

function updateResApiHandler(req,res){
    console.log('/update/:id', req.params.id);
    updateRes(req.params.id, req.body)
        .then(function (result) {
            res.status(200).json({message: 'res updated', data: result, result: true});
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).json({error: error, result: false})
        })
}


function updateRes(resId, updateData) {
    console.log('Update');
    return new Promise(function (resolve, reject) {
        console.log('add start 1');
        console.log(updateData);

       var update = {
           $set: {
               design: updateData.design,
               labels: updateData.labels,
               projects: updateData.projects,
               courses: updateData.courses,
               strengths: updateData.strengths,
               achievements: updateData.achievements,
               interests: updateData.interests,
               languages: updateData.languages,
               skills: updateData.skills,
               education: updateData.education,
               volunteer: updateData.volunteer,
               employment: updateData.employment,
               basics: updateData.basics,
               technologies: updateData.technologies
           }
       };
      //  var update = {$set: {updateData}};
       // var options = {new: true, upsert: false, setDefaultsOnInsert: false};
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

    })
}