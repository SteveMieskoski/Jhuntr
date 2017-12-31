var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = require('bluebird');

var userModel = require('./../../../../database').userSchema;


module.exports = function(taskId, data, options){
    return new Promise(function(resolve, reject){
        var updateOptions = {new: true};
        var update = {$set: data};
        userModel.tasks.findByIdAndUpdate(taskId, update, updateOptions )
            .exec()
            .then(function(result){
            resolve(result);
        })

    })
};






/*
 {
 "reminders": [{
 label: {
 type: String,
 default: ''
 },
 content: {
 type: String,
 default: ''
 },
 date: {
 type: Date
 }
 }],
 "tasks": [{
 label: {
 type: String,
 default: ''
 },
 content: {
 type: String,
 default: ''
 },
 complete: {
 type: Boolean,
 default: false
 }
 }],
 "notes": {type: String, default: ''},
 "description": {type: String, default: ''},
 "postingTime": {type: String, default: ''},
 "city": {type: String, default: ''}
 }
 */














/*

 module.exports = function(postId, data){
 return new Promise(function(resolve, reject){
 var update;
 var updateOptions;


 var postingData = postModel.posting.findById(postId);

 postingData.exec().then(function(resultPost){

 console.log('update posting');
 }).catch(function(err){
 console.log('ERROR:  failed to update posting remarks due to: ', err);
 reject(err);
 })
 })
 };

 function checkForRemarks(){
 return new Promise(function(resolve, reject) {
 console.log('0 get current post document: ', resultPost);
 // check if remarks field
 var propList = Object.keys(resultPost);
 if (propList.indexOf('remarks') >= 0) {
 if (resultPost.remarks._id) {
 update = {$set: data};
 updateOptions = {new: true};
 postModel.remarks.findByIdAndUpdate(resultPost.remarks.update, updateOptions)
 .exec()
 .then(function (result) {
 console.log('update remarks result', result);
 resolve(result);
 })
 } else {
 //probably could do without the else block as it returns ('resolves') if the above if is true  and shouldn't reach this far.
 createRemarksDoc(resultPost.remarks, data).then(function (result) {
 console.log('1 create remarks result', result);
 resolve(result)
 })
 }
 } else {
 createRemarksDoc(resultPost.remarks, data).then(function (result) {
 console.log('2 create remarks result', result);
 resolve(result)
 })
 }
 })
 }


 function createRemarksDoc(postObjectId, data){
 return new Promise(function(resolve, reject) {
 var remark = new postModel.remarks(data);
 remark.save().then(function (remarksResult) {
 postModel.remarks.findByIdAndUpdate(postObjectId, {$set: {remarks: remarksResult._id}}, {new: true})
 .exec()
 .then(function (result) {
 console.log('4 createRemarksDoc update post document result', result);
 resolve(remarksResult);
 })
 })
 })
 }
 */