var Promise = require('bluebird');

var models = require('../../../../database/index').resSchema;

module.exports.handler = retrieveResApiHandler;
module.exports.retrieveRes = retrieveRes;

function retrieveResApiHandler(req, res) {
    console.log('/retrieve/:id', req.params.id);
    retrieveRes(req.params.id)
        .then(function (result) {
            res.status(200).json({message: 'res data retrieved', data: result, result: true});
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).json({error: error, result: false})
        })
}


function retrieveRes(resId) {
    return new Promise(function (resolve, reject) {
        console.log(resId, 'resume.controller.retrieve: retrieve res call');
        if (!resId) reject('no resId present in request');
        models.core
            .find({_id: resId})
            //  .populate(models.populateRes)
            .exec()
            .then(function (info) {
                if (!info) {
                    reject();
                }
                resolve(info);
            })
            .catch(function (err) {
                console.log('retrieve error', err);
                reject(err);
            });
    })
}