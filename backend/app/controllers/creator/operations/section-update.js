var Promise = require('bluebird');

var models = require('../../../../database/index').resSchema;

module.exports.handler = sectionUpdateApiHandler;
module.exports.sectionUpdate = sectionUpdate;

    function sectionUpdateApiHandler(req, res){
        console.log('/sectionsUpdate/:id', req.params.id);
        sectionUpdate(req.params.id, req.body)
            .then(function (result) {
                res.status(200).json({message: 'section updated', data: result, result: true});
            })
            .catch(function (err) {
                res.status(500).json({message: 'error occured during section update', data: err, result: false})
            })
    }


    function sectionUpdate(resId, updateData) {

    return new Promise(function (resolve, reject) {
        var update;
        var sectionsUpdated = Object.keys(updateData);
        update = {$set: updateData};
        var options = {new: true};
        return models.resume.findByIdAndUpdate(resId, update, options)
            .exec()
            .then(function (resData) {
                if(sectionsUpdated.length === 1){
                    resolve(resData[sectionsUpdated[0]]);
                } else if(sectionsUpdated.length > 1){
                    var returnSections = {};
                    for(var i=0; i<sectionsUpdated.length; i++){
                        returnSections[sectionsUpdated[i]] = resData[sectionsUpdated[i]];
                    }
                    resolve(returnSections);
                } else {
                    resolve(resData);
                }
            })
            .catch(function (err) {
                console.log(err);
                reject(err);
            })
    });
};