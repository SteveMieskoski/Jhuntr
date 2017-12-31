var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Promise = require('bluebird');

var models = require('../../../../database').resSchema;


module.exports.handler = getMasterApiHandler;
module.exports.getMaster = getMaster;

function getMasterApiHandler(req, res) {
    console.log('/retrieveMaster/:userId', req.params.userId);
    getMaster(req.params.userId, req.params.resId)
        .then(function (result) {
            res.status(200).json({message: 'master res set', data: result, result: true});
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).json({error: error, result: false})
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