var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Promise = require('bluebird');

var models = require('../../../../database').resSchema;


module.exports.handler = setMasterApiHandler;
module.exports.setMaster = setMaster;

function setMasterApiHandler(req, res) {
    console.log('/setMaster/:userId/:resId', req.params.userId, req.params.resId);
    setMaster(req.params.userId, req.params.resId)
        .then(function (result) {
            res.status(200).json({message: 'master res set', data: result, result: true});
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).json({error: error, result: false})
        })
}

function setMaster(userId, resObjectId) {
    return models.resume.findOneAndUpdate({userId: userId, is_core: true}, {is_core: false})
        .exec()
        .then(function (resData) {

            return models.resume.findOneAndUpdate({userId: userId, _id:  resObjectId}, {is_core: true}, {new: true})
                .exec()
                .then(function (resData) {
                    return resData
                })
                .catch(function (err) {
                    console.log(err);
                    return err;
                })
        })
        .catch(function (err) {
            console.log(err);
            return err;
        })
}



function getMaster(userId) {
    return models.resume.findOne({userId: userId, is_core: true})
        .exec()
        .then(function (resData) {
            return resData;
        })
        .catch(function (err) {
            console.log(err);
            return err;
        })
}