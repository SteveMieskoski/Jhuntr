var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Promise = require('bluebird');

var models = require('../../../../database').resSchema;


module.exports.handler = copyResApiHandler;
module.exports.copyRes = copyRes;

function copyResApiHandler(req, res) {
    console.log('/copy/:id', req.params.resId);
    copyRes(req.params.resId, req.query)
        .then(function (result) {
            res.status(200).json({message: 'res copied', data: result, result: true});
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).json({error: error, result: false})
        })
}

function copyRes(resObjectID, options) {
    return models.resume.findById(resObjectID)
        .exec()
        .then(function (resData) {
            resData._id = mongoose.Types.ObjectId();
            resData.isNew = true;
            resData.ref_label = resData.ref_label + '_copy';

            if (options) {
                for (var prop in options) {
                    //if (resData.hasOwnProperty(prop)) {
                        resData[prop] = options[prop];
                   // }
                }
            }
            var resCopy = new models.resume(resData);
            return resCopy.save();
        })
        .catch(function(err){
            console.log(err);
            return err;
        })
}
