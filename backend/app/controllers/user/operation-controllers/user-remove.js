var Promise = require('bluebird');

var userModels = require('./../../../../database').userSchema;


module.exports.handler = removeUserApiHandler;


function removeUserApiHandler(req, res) {
    console.log('user/delete/:id', req.params.id);
    removeUser(req.params.id)
        .then(function (result) {
            res.status(200).json({message: 'user removed', data: result, result: true});
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).json({message: 'error occured on user remove', data: error, result: false})
        });
}


function removeUser(userId) {
    return new Promise(function (resolve, reject) {
        userModels.user.findOneAndRemove({userId: userId})
            .exec()
            .then(function (result) {
                resolve(result);
            })
            .catch(function (error) {
                console.log(error);
                reject(error);
            })
    })
};