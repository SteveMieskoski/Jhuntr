var Promise = require('bluebird');
var uuid = require('uuid');
var request = require('request');
var userModels = require('./../../../../database').userSchema;
var postingModels = require('./../../../../database').postingSchema;

module.exports.handler = addUserIdRelationApiHandler;
module.exports.addUserIdRelation = addUserIdRelation;


function addUserIdRelationApiHandler(req, res) {
    addUserIdRelation(req.body.user_id, req.body.userId, req.body.token).then(function (result) {
        console.log('user/createUser', req.url);
        res.status(200).json({message: 'user created', data: result, result: true});
    }).catch(function (error) {
        console.log(error);
        res.status(500).json({message: 'error occured on user create', data: error, result: false})
    });

};


function addUserIdRelation(user_id, userId, token) {
    return new Promise(function (resolve, reject) {

        if (userId) {
            userModels.user.findOne({userId: userId}).exec().then(function (result) {
                    if (result) {
                        if (result.userId.length > 2) {
                            resolve(addInternalUserId(result.userId, user_id, token));
                        } else {
                            reject('Error Occurred During Cloud Account Association: ', user_id);
                        }
                    } else {
                        reject('Error Occurred During Cloud Account Association: ', user_id);
                    }
                })
                .catch(function (error) {
                    reject('Error: ', error);
                })


        } else {
            reject('essential data missing to create user')
        }
        //   })


    });
};

function addInternalUserId(userId, user_id, token) {
    console.log('ADD INTERNAL USER ID TO AUTH0 PROFILE');
    return new Promise(function (resolve, reject) {

        var options = {
            method: 'PATCH',
            url: 'https://thatn3wguy.auth0.com/api/v2/users/' + user_id,
            headers: {
                'content-type': 'application/json',
                authorization: 'Bearer ' + token
            },
            body: {user_metadata: {userId: userId}},
            json: true
        };

        request(options, function (error, response, body) {
            if (error) reject(new Error(error));
            console.log(body);
            resolve(body);

        });
    })
}
