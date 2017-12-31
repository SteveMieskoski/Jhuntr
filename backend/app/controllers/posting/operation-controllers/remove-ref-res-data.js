var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Promise = require('bluebird');

var posting = require('../../../../database').postingSchema.posting;
var models = require('../../../../database').resSchema;

module.exports = function (resId, postId) {
    return new Promise(function (resolve, reject) {
        console.log(resId, 'copy -------------------------');
        models.resume.find({_id: resId})
            .exec().then(function (info) {
            info = info[0];
            if(!info){
                resolve(false);
                return
            }
            var delRes = {};
            var notsections = ['user_id', 'ref_label', 'associated_postings', 'resume_ref', 'pdf_ref', 'template_ref', 'attachments'];
            var keysLength = Object.keys(info);
            console.log(keysLength);
            for (var prop in info) {
                keysLength--;
                if (models.hasOwnProperty(prop) && notsections.indexOf(prop) < 0 ) {
                   if(Array.isArray(info[prop])){
                       delRes[prop] = arrayPromise(info, prop);
                    } else {
                       var del = models[prop].findByIdAndRemove(info[prop]._id);
                         delRes[prop] =  del.exec();
                    }
                }
            }

              Promise.props(delRes).then(function(result){
                  models.resume.findByIdAndRemove(info._id, function(result){
                      console.log('END RESULT', result);
                      var update = {$set: {resume_ref: null}};
                      posting.findByIdAndUpdate(postId, update);
                      resolve(result);
                  });

                })
        })
    });
};

function arrayPromise(info, prop){
    var pArray = [];
    var len = info[prop].length;
    while(len--){
         var del = models[prop].findByIdAndRemove(info[prop][len]._id);
        pArray.push(del.exec())
    }
   return Promise.all(pArray);
}