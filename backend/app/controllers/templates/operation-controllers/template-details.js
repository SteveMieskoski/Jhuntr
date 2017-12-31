var Promise = require('bluebird');
var templatesModels = require('../../../../database/index').templateSchema;





module.exports = function(id, name){
    return new Promise(function(resolve, reject){

       /* var query = req.query.id ? {_id: req.query.id} : {name: req.query.name};
        if(id){
            query = {_id: id};
        } else if(name){
            query = {name: name};
        } else {
            resolve({
                name: "core",
                photo_option: true
            })
        }
        resolve(templatesModels.findOne(query).exec()) */
        resolve({
            name: "core",
            photo_option: true
        })
    })

}
