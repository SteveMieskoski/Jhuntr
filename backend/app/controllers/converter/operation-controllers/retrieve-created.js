var Promise = require('bluebird');
var postingModel = require('../../../../database').postingSchema;
exports.retreiveFile = retreiveFile;


function retreiveFile(id, type){
    return new Promise(function (resolve, reject) {
        postingModel.findById(id, function (err, data) {
            if (err) {
                reject(err);
               // res.status(500).json({message: 'error: ' + err, result: false})
            }
            if (type === 'resume') {
                resolve(data.resume_ref);
              //  res.send(data.resume_ref);
            } else {
                resolve(data.coverLetter_ref);
              //  res.send(data.coverLetter_ref);
            }

        })
    })
}

