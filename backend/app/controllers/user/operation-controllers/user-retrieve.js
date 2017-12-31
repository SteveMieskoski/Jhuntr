var Promise = require('bluebird');

var userModels = require('./../../../../database').userSchema;


module.exports.handler = getUserDetailsApiHandler;
module.exports.getUserDetails = getUserDetails;

function getUserDetailsApiHandler(req, res) {
    getUserDetails(req.params.id)
        .then(function (result) {
            res.status(200).json({message: 'user data retrieved', data: result, result: true});
        }).catch(function (error) {
            console.log(error);
        res.status(500).json({message: 'error occured on user data retrieve', data: error, result: false})
    });
}


function getUserDetails(id) {
    return new Promise(function (resolve, reject) {
        var getUser;
        //a645a557-bfe0-41e3-892b-6ec31e337d75
        if (/\w{8}-?\w{4}-?\w{4}-?\w{4}-?\w{12}/.test(id)) {
            console.log('new user id', id);
            getUser = userModels.user.find({userId: id}, "user_id user_name");
        } else {
            console.log('old user id(user_id): ', id);
            getUser = userModels.user.find({user_id: id}, "user_id user_name");

        }
        //  userModels.user.find({userId: id}, "user_id user_name")
        //   .populate("user_id user_name")
        getUser
            .exec()
            .then(
                function (info) {
                    resolve(info);
                    if (!info) {
                        reject()
                    }
                })
            .catch(function (error) {
                console.log('user-retrieve.js Error:', error);
            })
    })
}

//"user_id user_name skills saved_postings core_resume resumes tasks reminders role"