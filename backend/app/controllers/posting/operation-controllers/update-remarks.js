var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = require('bluebird');
var fs = require('fs');

var postModel = require('../../../../database').postingSchema;
var helper = require('../../../utils/path-helper');

module.exports = function(postId, options, data){
    return new Promise(function(resolve, reject){
        var update;
        var updateOptions = {new: true};
        var postingData = postModel.posting.findById(postId).exec();
        console.log('REMARKS UPDATE OPTIONS', options);
        postingData.then(function(postContent){
            console.log('POSTDATA POSTCONTENT', postContent);
            if(postContent.remarks){
                switch(options.action){
                    case 'addReminder':
                        break;
                    case 'updateReminder':
                        break;
                    case 'deleteReminder':
                        break;
                    case 'addTask':
                        console.log('add task');
                        postModel.remarks.findByIdAndUpdate(postContent.remarks, {$push: {tasks: data}}, {new: true, select: 'tasks'}).exec().then(function(result){
                            console.log(result);
                            resolve(result);
                        });
                        break;
                    case 'updateTask':
                        break;
                    case 'deleteTask':
                        break;
                }
            } else {
                if(!postContent.hasOwnProperty('remarks')){
                    createRemarksDoc(postId, data).then(function(result){
                        resolve(result);
                    })
                }
            }
        })


    })
};


function modifyRemarks(remarksContent, action){
    return new Promise(function(resolve, reject) {

    })
}


function createRemarksDoc(postObjectId, data){
    console.log('createRemarksDoc input:', postObjectId, data);
    return new Promise(function(resolve, reject) {
        var remark = new postModel.remarks(data);
        remark.save().then(function (remarksResult) {
            console.log('createRemarksDoc raw save response:', remarksResult);
            postModel.posting.findByIdAndUpdate(postObjectId, {$set: {remarks: remarksResult._id}}, {new: true})
                .exec()
                .then(function (result) {
                    console.log('4 createRemarksDoc update post document result', result);
                    resolve(remarksResult);
                })
        })
    })
}


