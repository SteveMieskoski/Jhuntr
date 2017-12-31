var pdf = require('html-pdf');
var postingModel = require('../../../../database').postingSchema.posting;
var spawn = require('child_process').spawn;
var fs = require('fs-extra');
var dotenv = require('dotenv');
var root = require('../../../utils/path-helper');
var path = require('path');
//dotenv.load();


module.exports = function (req, res) {
	console.log('general.convert'); // todo remove debug item
    var fileContent = req.body.output;
    var associatedPosting = req.body.infoForSave;
    //var extension = 'pdf';
    //var outFormat = 'pdf';
    var extension = req.body.ext ? req.body.ext : req.body.infoForSave.fileType;
    var outFormat = req.body.infoForSave.fileType;
    createTempFile(fileContent, associatedPosting, extension, outFormat, function (tmpFile, extension, outFormat, outFile) {

        var savedFileName = associatedPosting.postingId + associatedPosting.fileUse;
        createOutput(tmpFile, savedFileName, extension, outFormat, outFile, function (tempFile, convertStatus) {

            fs.remove(tempFile, function (err) {
                if (err) return console.error(err);
            });
            if(convertStatus){
                var newFile = process.env.SAVE_BASE + savedFileName + '.' + extension;

                if (associatedPosting.fileUse === 'resume' && convertStatus) {
                    checkPriorOutput(associatedPosting.postingId, 'resume', newFile, function () {

                        addResumeRef(associatedPosting.postingId, newFile, function (err, data) {
                            if (err) {
                                res.status(500)
                                   .json({
                                       message: 'Error getting db entries.'
                                   });
                            }
                            res.status(200)
                               .json({
                                   message: 'File saved'
                               })
                        })
                    })

                } else if(associatedPosting.fileUse === 'coverLetter' && convertStatus){
                    checkPriorOutput(associatedPosting.postingId, 'coverLetter', newFile, function (newFile) {

                        addLetterRef(associatedPosting.postingId, newFile, function (err, data) {
                            if (err) {
                                res.status(500)
                                   .json({
                                       message: 'Error getting db entries.'
                                   });
                            }
                            res.status(200)
                               .json({
                                   message: 'File saved'
                               })
                        })
                    })

                } else {

                }
            }

        });
    });


}


function createTempFile(fileContent, reqInfo, extension, outFormat, cb) {
    console.log('creating text');
    var tmpFile;
    var outFile;
    tmpFile = 'backend/TexOutput/' + reqInfo.postingId + reqInfo.fileUse + '.html';
    outFile = process.env.SAVE_BASE + reqInfo.postingId + reqInfo.fileUse + '.' + extension;

    fs.writeFile(tmpFile, fileContent, function () {
        fs.writeFile(outFile, 'none', function(){
            cb(tmpFile, extension, outFormat, outFile);
        })
    });
}

function createOutput(tempFileRel, filename, extension, outFormat, outFileRel, cb) {
    var dirRoot = path.resolve();
    var tempFile = dirRoot + '/' + tempFileRel;
    var outFile = dirRoot + '/' + outFileRel;

    console.log('creating output');

    //console.log("command flags",  tempFile, '--write=' + outFormat, ' -s --output=' + outFile);

    /**
     *  Convert From Html to specified format
     */
    var child = spawn('pandoc', [tempFile,'-s','-o', outFile]);
    console.log('child channel', child.channel);

    var timeCheck = setTimeout(function () {
        child.kill();
        console.log('is child active', child.pid);
        tempFile = 'Error';
        return cb('error');
    }, 60000);

    child.stdout.on('data', function (data) {
        console.log('from child stdOut', data.toString());
    });

    child.stdin.on('data', function (data) {
        console.log('Stdin received', data);
    });

    child.stderr.on('data', function (data) {
        console.log('from child error', data.toString());
        clearTimeout(timeCheck);
        cb(tempFile, false);
        return;
    });

    child.on('close', function () {
        clearTimeout(timeCheck);
        cb(tempFile, true);
    });


}

function checkPriorOutput(postingId, docType, newFile, cb) {
    postingModel.findById(postingId, function (err, data) {
        if (data[docType + '_ref']) {
            if (data[docType + '_ref'].length > 0 && newFile != data[docType + '_ref']) {
                console.log('removing old different version', data[docType + '_ref']);
                fs.remove(data[docType + '_ref'], function (err) {
                    if (err) return console.error(err);
                });

            }
        }
    });
    cb();
}


function addResumeRef(postingId, newId, res) {
    postingModel.findByIdAndUpdate(postingId, {$set: {resume_ref: newId}}, function (err, data) {
        if (err) {
            res(err, data);
        }
        res(err, data);
    })
}

function addLetterRef(postingId, newId, res) {
    postingModel.findByIdAndUpdate(postingId, {$set: {coverLetter_ref: newId}}, function (err, data) {
        if (err) {
            res(err, data);
        }
        res(err, data);
    })
}