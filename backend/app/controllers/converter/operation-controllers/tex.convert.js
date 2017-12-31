
/*
var posting = require('./../../../models/posting.model');
var cover = require('./../../../models/cover.model');
var mongoose = require('mongoose');
var mongo = require('mongodb');
var Grid = require('gridfs-stream');
var fs = require('fs-extra');
var db = require('../../../mongodb.connect.js');
var dotenv = require('dotenv');
var pdfjs = require('pdfjs-dist');
var spawn = require('child_process').spawn;
var helper = require('../../../path-helper');

//dotenv.load();

Grid.mongo = mongoose.mongo;


//  NOTE: current hard save of files is intended as a temporary solution to allow the implementation functionality in view of difficulties encountered when retrieving files from mongodb & gridfs.



module.exports = function (req, res){
    var fileContent = req.body.output;
    var associatedPosting = req.body.infoForSave;
    try{
    createTexOut(fileContent, associatedPosting, function(tmpFile){

            if(tmpFile === 'error'){
                console.log( 'Error converting pdf.');
            } else {
                var savedFileName = associatedPosting.postingId + associatedPosting.fileUse;
                removeExtraFiles(savedFileName);
                addFilePdfDirect(associatedPosting, function(err, data){
                    if (err) {
                        res({status: 500, message: 'Error getting db entries.', error: err});
                    }
                    if(tmpFile === 'Error'){
                        res({status: 501, message:  'Error converting pdf.'});
                    } else {
                        res({status: 200, message: 'file converted'});
                    }
                })
            }
    });
    } catch (e){
        console.log(e);
    }
};


function createTexOut(fileContent, reqInfo, cb){
    console.log('creating text');
    var tmpFile = 'backend/TexOutput/' + reqInfo.postingId + reqInfo.fileUse + '.tex';
    console.log(tmpFile);

    fs.writeFile(tmpFile, fileContent, function(){
        console.log('creating pdf');

        var child = spawn('xelatex', [ tmpFile, '-interaction="nonstopmode"']);
        console.log('child channel', child.channel);

        var timeCheck = setTimeout(function(){
            child.kill();
            console.log('is child active', child.pid);
            tmpFile = 'Error';
            return cb('error');
        }, 10000);

        child.stdout.on('data', function(data){
             console.log('from child', data.toString());
        });

        child.stdin.on('data', function(data){
            console.log('Stdin received', data);
        });

        child.stderr.on('data', function(data){
            console.log('from child error', data.toString());
        });

        child.on('close', function(){
            clearTimeout(timeCheck);
            cb(tmpFile);
        });


    });

}

function addFilePdfDirect(postingData, res) {
    var fileLocationTemp =  postingData.postingId + postingData.fileUse + '.pdf';

    if(postingData.fileUse === 'resume'){
        addResumeRef(postingData.postingId, fileLocationTemp, res);
    } else {
        addLetterRef(postingData.postingId, fileLocationTemp, res);
    }
}

function addResumeRef(postingId, newId, res) {
    posting.findByIdAndUpdate(postingId, {$set: {resume_ref: newId}}, function (err, data) {
        if(err){
            res(err, data);
        }
        res(err, data);
    })
}

function addLetterRef(postingId, newId, res) {
    posting.findByIdAndUpdate(postingId, {$set: {coverLetter_ref: newId}}, function (err, data) {
        if(err){
            res(err, data);
        }
        res(err, data);
    })
}

function removeExtraFiles(fileName){
    fs.remove(fileName + '.aux', function (err) {
        if (err) return console.error(err);
    });
    fs.remove(fileName + '.log', function (err) {
        if (err) return console.error(err);
    });
    fs.remove(fileName + '.out', function (err) {
        if (err) return console.error(err);
    });
    fs.copy(helper.root(fileName + '.pdf'), helper.root('backend', 'pdftemp', fileName + '.pdf'), function (err) {
        if (err) return console.error(err);
        fs.remove(fileName + '.pdf', function (err) {
            if (err) return console.error(err);
        });
    });

    fs.remove('backend/TexOutput/' + fileName + '.tex', function (err) {
        if (err) return console.error(err);
    });
}

    */