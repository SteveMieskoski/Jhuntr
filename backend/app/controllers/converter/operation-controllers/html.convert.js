var fs = require('fs-extra');
var pdf = require('html-pdf');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var postingModel = require('../../../../database').postingSchema.posting;
var Promise = require('bluebird');
var dotenv = require('dotenv');
var pathHelper = require('../../../utils/path-helper');
var spawn = require('child_process').spawn;
var wkhtmltopdf = require('wkhtmltopdf');
var htmlToPdf = require('./htmlToPdf');
//dotenv.load();

module.exports.parseHtml = parseHtml;
module.exports.createTempFile = createTempFile;

// todo rebuild as a commonly functioning module rather than one keyed directly to express
// req.body = {data: code, postingId: dataDoc.oId, fileName: 'none', fileUse: fileUse, fileType: 'html'};
function parseHtml(req, res){
	console.log('html.convert'); // todo remove debug item
    return new Promise(function(resolve, reject){
        createTempFile(req).then(function(tempFileName){
            var savedFileName = req.body.postingId + req.body.fileUse;
            htmlToPdf.createPdf(tempFileName, savedFileName).then(function(){
              //  fs.remove(tempFileName, function (err) {
               //     if (err) return console.error(err);
               // });
            }).then(function(){
                var newFile = process.env.SAVE_PDF_BASE + savedFileName + '.pdf';
                if(req.body.fileUse === 'resume'){
                    addResumeRef(req.body.postingId, newFile).then(function(data){
                        resolve(true);
                      //     res.status(200).json({message: 'file converted'});

                    }).catch(function(error){
                       // console.log('error updating res ref', error);
                        reject(false);
                    })
                } else {
                    addLetterRef(req.body.postingId, newFile).then(function(data){
                        resolve(true);
                      //  res.status(200).json({message: 'file converted'});

                    }).catch(function(error){
                        console.log('error updating cover ref', error);
                        reject(false);
                    })
                }
            }).catch(function(error){
                console.log('error creating pdf', error);
                reject(false);
            })
        }).catch(function(error){
            console.log('error creating temp file', error);
            reject(false);
        })
    })

}

// req.body = {data: code, postingId: dataDoc.oId, fileName: 'none', fileUse: fileUse, fileType: 'html'};

function createTempFile(req, cb){

    return new Promise(function(resolve, reject){
        console.log('creating text');
        console.log(req.body.data);
        var tmpFile = process.env.PDF_TEMP_FILE_BASE + req.body.postingId + req.body.fileUse + '.html';
        console.log(tmpFile);
        fs.writeFile(tmpFile, req.body.data, function(){
            console.log('creating pdf');
            resolve(tmpFile);
        });
    })
}


function addResumeRef(postingId, newId, res) {
    var updateResRef = postingModel.findByIdAndUpdate(postingId, {$set: {resume_ref: newId}});
    return updateResRef.exec();
}

function addLetterRef(postingId, newId) {
    var updateCoverRef = postingModel.findByIdAndUpdate(postingId, {$set: {coverLetter_ref: newId}});
    return updateCoverRef.exec();
}


/*
 var fileContent;
 var associatedPosting;
 fileContent = req.body.output;
 associatedPosting = req.body.infoForSave;
 createTempFile(req , function(tmpFile){
 var savedFileName = associatedPosting.postingId + associatedPosting.fileUse;
 createPdf(tmpFile, savedFileName, function(){
 var newFile = 'backend/pdftemp/' + savedFileName + '.pdf';
 if(associatedPosting.fileUse === 'resume'){
 addResumeRef(associatedPosting.postingId, newFile, function(err, data){
 if (err) {
 res({status: 500, message: 'Error getting db entries.', error: err});
 } else {
 res({status: 200, message: 'file converted'});
 }
 })
 } else {
 addLetterRef(associatedPosting.postingId, newFile, function(err, data){
 if (err) {
 res.status(500)
 .json({
 message: 'Error getting db entries.'
 });
 }
 res.status(200).json({
 message: 'File saved'
 })
 })
 }
 });
 });
 */