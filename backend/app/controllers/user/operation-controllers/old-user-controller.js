var posting = require('./../../../../database').postingSchema.posting;
var userModels = require('./../../../../database').userSchema;
var mongoose = require('mongoose');


module.exports.everyPosting = everyPosting;
module.exports.everyUser = everyUser;
module.exports.listUserSavedPosts = listUserSavedPosts;
//module.exports.createUser = createUser;
//module.exports.updateUser = updateUser;
module.exports.updateUserSkills = updateUserSkills;
//module.exports.getOneUser = getOneUser;
module.exports.removeSkill = removeSkill;
//module.exports.remove = remove;

//todo modify returned (json) data object to include a result indicator (i.e. {result: true} for success and {result: false} for error or other failure

function errorHandler(err) {
    console.log('ERROR occurred during create');
    return {
        message: 'Error saving info',
        error: err,
        result: false
    };
}


function everyPosting(req, res) {
    posting.find()
        .exec(function (err, posts) {
            if (err) {
                return res.status(500)
                    .json({
                        message: 'Error getting db entries.',
                        result: false
                    });
            }
            return res.json(posts);
        });
}

function everyUser(req, res) {
    userModels.user.find()
        .exec(function (err, posts) {
            if (err) {
                return res.status(500)
                    .json({
                        message: 'Error getting db entries.',
                        result: false
                    });
            }
            return res.json(posts);
        });
}


function createUser(req, res) {

    var newUser = new userModels.user(req.body);

    newUser.save(function (err, data) {
        if (err) {
            var errMsg = errorHandler(err);
            console.log('ERROR occurred during create');
            return res.status(500)
                .json(errMsg);
        }
        return res.json({
            success: true,
            message: 'saved',
            item: data,
            result: true
        });
        /*  updates.start(data._id, '')
         .then(function (resData) {
         //  res.status(200).json({message: 'complete', result: true});
         user.findByIdAndUpdate(data._id, resData)
         return res.json({
         success: true,
         message: 'saved',
         item: data,
         result: true
         });
         }); */
    });
}

// todo need to populate the items returned
function listUserSavedPosts(req, res) {
    var id = req.params.id;
    userModels.user.find({user_id: id})
        .populate('saved_items')
        .select("saved_items _id")
        .exec(function (err, posts) {
            if (err) {
                return res.status(500)
                    .json({
                        message: 'Error getting db entries.',
                        result: false
                    });
            }
            return res.json(posts);
        });
}


function getOneUser(req, res) {
    console.log(req.params.id);
    var id = req.params.id;
    userModels.user.find({user_id: id})
        .populate('saved_items')
        .exec(function (err, info) {
            if (err) {
                return res.status(500)
                    .json({
                        message: 'Error getting info.',
                        result: false
                    });
            }
            if (!info) {
                return res.status(404)
                    .json({
                        message: 'No such info',
                        result: false
                    });
            }
            return res.json(info);
        });
}


function updateUser(req, res) {
    console.log(req.params.id);
    userModels.user.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, data) {
        if (err) {
            console.log('ERROR occurred during find id operation for Update');
            return res.status(500)
                .json({
                    message: 'Error during find id operation for Update',
                    error: err,
                    result: false
                });
        }
        res.send(data)
    })
}

function updateUserSkills(req, res) {
    console.log(req.params.id);
    userModels.user.findByIdAndUpdate(req.params.id, {$addToSet: {skills: {$each: req.body.skills}}}, function (err, data) {
        if (err) {
            console.log('ERROR occurred during find id operation for Update');
            return res.status(500)
                .json({
                    message: 'Error during find id operation for Update',
                    error: err,
                    result: false
                });
        }
        res.send(data)
    })
}

function removeSkill(req, res) {
    console.log(req.params.id);
    userModels.user.findByIdAndUpdate(req.params.id, {$pullAll: req.body}, function (err, data) {
        if (err) {
            console.log('ERROR occurred during find id operation for Update');
            return res.status(500)
                .json({
                    message: 'Error during find id operation for Update',
                    error: err,
                    result: false
                });
        }
        res.send(data)
    })
}

function remove(req, res) {
    console.log(req.params.id);
    userModels.user.findByIdAndRemove(req.params.id, function (err, data) {


        if (err) {
            console.log('ERROR occurred during find id operation for Update');
            return res.status(500)
                .json({
                    message: 'Error during find id operation for Update',
                    error: err,
                    result: false
                });
        }
        console.log('DELETED: ', data);
        res.send(data)
    })

}