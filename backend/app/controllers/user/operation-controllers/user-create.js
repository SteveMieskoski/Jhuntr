var Promise = require('bluebird');
var uuid = require('uuid');
var request = require('request');
var userModels = require('./../../../../database').userSchema;
var postingModels = require('./../../../../database').postingSchema;

exports.handler = function createUserHandler(req, res){
    createUser(req.body.user_id, req.body)
};

module.exports = createUser;

    function createUser(user_id, initData) {
    return new Promise(function (resolve, reject) {
        var newUser;
        var userId = uuid.v4();
        console.log(user_id);
        initData.userId = userId;
        if(user_id){
            addInternalUserId(userId, user_id, initData.token)
                .then(function(response){
                    if(initData.hasOwnProperty('user_id')){
                        newUser = new userModels.user(initData.data);
                    } else {
                        newUser = new userModels.user({user_id: user_id, userId: userId});
                    }

                    var newPostStatuses = new postingModels.statuses({user_id: user_id, userId: userId});

                    newPostStatuses.save()
                        .then(function (result) {
                            newUser.posting_statuses = result;

                            resolve(newUser.save());
                        })
                        .catch(function (err) {
                            console.log('error creating user', err);
                            reject(err);
                        })
                })


        } else {
            reject('essential data missing to create user')
        }


    });
};

    function addInternalUserId(userId, user_id, token){
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


    /*
curl --request POST \
--url 'https://thatn3wguy.auth0.com/oauth/token' \
--header 'content-type: application/json' \
--data '{"grant_type":"client_credentials","client_id": "Chw9E1k6a8jiZFeV8zDKSVpk2haGRP3b","client_secret": "SSbmc9fsTmjuyRzdWGUmbyZD5q-s1DSDObKxhirveP4pH0ljPJD5mhZX_VvscOpG","audience": "https://thatn3wguy.auth0.com/api/v2/"}'

        */