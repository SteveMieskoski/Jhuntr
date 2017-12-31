var Promise = require('bluebird');
var join = Promise.join;


var resSchemas = require('../../../../database/index').resSchema;
var userModel = require('../../../../database/index').userSchema;


module.exports.handler = createAltResApiHandler;
module.exports.createAltRes = createAltRes;

function createAltResApiHandler(req, res) {
    console.log('/createNewAlt/:userId/:schema', req.params.userId, req.params.schema);
    createAltRes(req.params.userId, req.params.schema, req.body)
        .then(function (result) {
            res.status(200).json({message: 'res list retrieved', data: result, result: true});
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).json({error: error, result: false})
        })
}

function createAltRes(userId, schema, data) {
    console.log(data);
    var newResume = new resSchemas[schema](data);
    switch(schema){
        case 'dropboxRef':
            newResume.ref_label = data.name;
            break;
        case 'driveRef':
            newResume.ref_label = data.name;
            break;
    }
  //  if(schema === 'dropboxRef'){
   //     newResume.ref_label = data.name;
  //  }
    newResume.userId = userId;
    newResume.template_ref = 'none';
    return newResume.save();
}


