var Promise = require('bluebird');
var uuid = require('uuid');
var request = require('request');
var userModels = require('./../../../../database').userSchema;
var postingModel = require('./../../../../database').postingSchema;

module.exports.handler = createUserApiHandler;
module.exports.createUser = createUser;


function createUserApiHandler(req, res) {
    createUser(req.body.data.user_id, req.body.data, req.body.token).then(function (result) {
        console.log('user/createUser', req.url);
        res.status(200).json({message: 'user created', data: result, result: true});
    }).catch(function (error) {
        console.log(error);
        res.status(500).json({message: 'error occured on user create', data: error, result: false})
    });

};


function createUser(user_id, initData, token) {
    return new Promise(function (resolve, reject) {

        //  userModels.user.find({user_id: user_id})
        //      .then(function(result){
        //         if(result) resolve();
        var newUser;
        var populateTargets;
        if (user_id) {
            userModels.user.findOne({user_id: user_id}).exec().then(function (result) {
                    if (result) {
                        if (result.userId.length > 2) {
                            resolve(addInternalUserId(result.userId, user_id, token));
                        } else {
                            reject('Error Occurred During SignUo');
                        }
                    } else {
                        var userId = uuid.v4();
                        console.log('create user user_id', user_id);
                        initData.userId = userId;
                        addInternalUserId(userId, user_id, token)
                            .then(function (response) {
                                if (initData.hasOwnProperty('user_id')) {
                                    newUser = new userModels.user(initData);
                                    populateTargets = prePopulateStatuses(userId);
                                    Promise.all(populateTargets).then(function() {
                                        resolve(newUser.save());
                                    });
                                } else {
                                    newUser = new userModels.user({user_id: user_id, userId: userId});
                                    populateTargets = prePopulateStatuses(userId);
                                    Promise.all(populateTargets).then(function() {
                                        resolve(newUser.save());
                                    });
                                }

                                /*   var newPostStatuses = new postingModels.statuses({user_id: user_id, userId: userId});

                                 newPostStatuses.save()
                                 .then(function (result) {
                                 newUser.posting_statuses = result;

                                 resolve(newUser.save());
                                 })
                                 .catch(function (err) {
                                 console.log('error creating user', err);
                                 reject(err);
                                 })*/
                            })
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


function prePopulateStatuses(userId){
    var posts = [];
    var demos = [
        {
            label: "Job Wish List or Targeted Positions",
            status: "Targeted"
        },
        {
            label: "Positions you've applied for",
            status: "Sent"
        },
        {
            label: "Phone Screening/Interviews",
            status: "Initial Contact"
        },
        {
            label: "On Site Interviews",
            status: "Interviewing"
        }
    ];
    for(var i=0; i<demos.length; i++){
        var newPosting = new postingModel.posting(demos[i]);
        newPosting.userId = userId;
        posts.push(newPosting.save());
    };
    return posts;

}

/*
 curl --request POST \
 --url 'https://thatn3wguy.auth0.com/oauth/token' \
 --header 'content-type: application/json' \
 --data '{"grant_type":"client_credentials","client_id": "Chw9E1k6a8jiZFeV8zDKSVpk2haGRP3b","client_secret": "SSbmc9fsTmjuyRzdWGUmbyZD5q-s1DSDObKxhirveP4pH0ljPJD5mhZX_VvscOpG","audience": "https://thatn3wguy.auth0.com/api/v2/"}'

 */