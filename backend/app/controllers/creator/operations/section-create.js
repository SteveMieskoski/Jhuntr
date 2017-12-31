var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Promise = require('bluebird');

var models = require('../../../../database/index').resSchema;
var EmptySectionTemplates = require('./empty-section-templates');

module.exports.handler = sectionCreateApiHandler;
module.exports.sectionCreate = sectionCreate;

function sectionCreateApiHandler(req, res) {
    console.log('/sectionsCreate/:id/:section', req.params.id, req.params.section);
    sectionCreate(req.params.id, req.params.section)
        .then(function (result) {
            console.log('sectionCreate result ', result);
            res.status(200).json({message: 'section updated', data: result, result: true});
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).json({message: 'error occured during section create', data: err, result: false})
        })
}


function sectionCreate(resId, section) {
    return new Promise(function (resolve, reject) {
        console.log('create section: ', section);
        console.log('add start 1');

        models.resume.findById(resId)
            .exec()
            .then(function (results) {
                //  if(results[section].length)
                var newIndex = results[section].length;
                var sectionAddition = {};
                sectionAddition[section] = EmptySectionTemplates[section];
                sectionAddition[section].index = newIndex;
                var update = {$push: sectionAddition};
                var options = {new: true};
                models.resume.findByIdAndUpdate(resId, update, options)
                    .then(function (result) {
                        // console.log('section create', result);
                        resolve(result[section][result[section].length - 1]);
                        // resolve(result);
                    })
                    .catch(function (err) {
                        console.log('section create', err);
                        reject(err);
                    });
            })
            .catch(function (err) {
                console.log('sction create error', err);
                reject(err);
            })


    })
};