var Promise = require('bluebird');

var userModels = require('./../../../../database').userSchema;


module.exports = function getOneUser(id) {
    return new Promise(function (resolve, reject) {
        var getSaved;
        if (/\w{8}-?\w{4}-?\w{4}-?\w{4}-?\w{12}/.test(id)) {
            console.log('new user id', id);
            getSaved = userModels.user.find({userId: id});
        } else {
            console.log('old user id(user_id): ', id);
            getSaved = userModels.user.find({user_id: id});
        }
        getSaved
            .populate('saved_items')
            .exec()
            .then(
                function (info) {
                    resolve(info);
                    if (!info) {
                        reject()
                    }
            })
    })
}