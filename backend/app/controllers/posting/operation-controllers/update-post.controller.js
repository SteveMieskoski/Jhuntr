var dotenv = require('dotenv');
var Promise = require('bluebird');
var fs = require('fs');

var postModel = require('../../../../database').postingSchema;


module.exports = function(postId, data){
   return new Promise(function(resolve, reject){
       var update;
       var options;
        console.log('update-post data:', data);
       update = {$set: data};
       options = {new: true};
       var updatePosting = postModel.posting.findByIdAndUpdate(postId, update, options);
       updatePosting.exec().then(function(result){
           console.log('update posting');
           resolve(result);
       })
   })
};