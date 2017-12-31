var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var fs = require('fs-extra');

var models = require('../../../../database').resSchema;


module.exports.handler = removeResApiHandler;
module.exports.removeRes = removeRes;

function removeResApiHandler(req, res) {
    console.log('/removeRes/:id/:user', req.params.id);
    removeRes(req.params.resId)
        .then(function (result) {
            res.status(200).json({message: 'res removed', data: result, result: true});
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).json({error: error, result: false})
        })
}

function removeRes(resObjectID) {
    return models.core.findByIdAndRemove(resObjectID)
        .exec()
        .then(function (resData) {
            console.log('removed res data',resData);
            if (resData.pdf_ref) {
                return fs.pathExists(resData.pdf_ref)
                    .then(function (exists) {
                        if (exists) {
                            return fs.remove(resData.pdf_ref)
                                .then(function (removed) {
                                    return resData;
                                })
                                .catch(err => {
                                    console.error(err)
                                })
                        } else {
                            return resData;
                        }
                    })
                    .catch(err => {
                        console.error(err)
                    })
            } else {
                return resData;
            }
        })
        .catch(function (err) {
            console.log(err);
            return err;
        })
}
