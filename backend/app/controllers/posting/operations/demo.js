var postingModel = require('../../../../database').postingSchema;
var Promise = require('bluebird');


module.exports.handler = listStatusesApiHandler;
module.exports.listStatuses = listStatuses;

function listStatusesApiHandler(req, res) {
    console.log('/getStatuses/:userId for:', req.params.userId);

    listStatuses(req.params.userId)
        .then(function (result) {
            res.status(200).json({message: 'current statuses retrieved', data: result, result: true});
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).json({error: error, result: false})
        })
}


function listStatuses(user_id) {
    return new Promise(function(resolve, reject){
        console.log(user_id);
        postingModel.posting
            .find({userId: user_id})
            .select("_id status")
            .exec()
            .then(function(results){
                resolve(results);
               /* var statuses = {};
                for(var i=0; i<results.length; i++){
                  var keys = Object.keys(statuses);
                  if(keys.indexOf(results[i].status) >= 0) {
                      statuses[results[i].status].push(results[i]);
                      //  } else if(keys.indexOf(results[i].status) === -1) {
                  } else {
                      statuses[results[i].status] = [];
                      statuses[results[i].status].push(results[i]);
                  }
                }
                resolve(statuses);*/
            })
    })

};