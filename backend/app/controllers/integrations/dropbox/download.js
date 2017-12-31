var request = require('request');
var rp = require('request-promise');
var fs = require('fs-extra');
var nodePath = require('path');
var Promise = require('bluebird');
var EventEmitter = require('events');
var Dropbox = require('dropbox');

var track = require('../utils/track');

module.exports.handler = downloadApiHandler;


function downloadApiHandler(req, res) {
    console.log(req.body);
    download(req.params.userId, req.body.token, req.body.path)
        .then(function (result) {
            res.status(200).json({message: 'res updated', data: result, result: true});
        })
        .catch(function (error) {
            console.log('LOG1: ', error);
            res.status(500).json({error: error, result: false})
        })
}


function download(userId, token, path) {
    return new Promise(function (resolve, reject) {
        var dbx = new Dropbox({accessToken: token});
        dbx.filesDownload({path: path})
            .then(function (response) {
                console.log(response);
                writeToTempFile(userId, response)
                    .then(function (result) {
                        resolve(result);
                    })
                    .catch(function (error) {
                        console.log('LOG2: write to file error');
                        reject(error);
                    })
            })
            .catch(function (error) {
                console.log(error);
                reject(error);
            });
    });
    /*
     return new Promise(function (resolve, reject) {
     var headerPath = JSON.stringify({path: path});
     var options = {
     method: 'POST',
     uri: 'https://content.dropboxapi.com/2/files/download',
     headers: {
     Authorization: 'Bearer ' + token,
     "Dropbox-API-Arg": headerPath
     },
     json: true // Automatically stringifies the body to JSON
     };
     rp(options)
     .then(function(result){
     writeToTempFile(userId, path, result)
     .then(function(result){
     resolve(result);
     })
     .catch(function(error){
     console.log('LOG2: write to file error');
     reject(error);
     })
     })
     .catch(function(error){
     console.log('LOG3: ',error);
     reject(error);
     })

     })*/
}


function writeToTempFile(userId, result) {
    return new Promise(function (resolve, reject) {
        var base = nodePath.resolve(__dirname, '..');
        var temp = nodePath.join(base, 'temp', userId);
        console.log('LOG7:', temp);
        fs.ensureDir(temp, function (ensureResult) {
            //  deleteTimer(temp);
            track.emit('addTimer', temp);
            console.log('LOG4: ', ensureResult);
            var fileTemp = nodePath.join(temp, result.name);
            fs.writeFile(fileTemp, result.fileBinary, 'binary', function (err) {
                if (err) {
                    console.log('LOG6: write errored');
                    reject(err);
                }
                console.log('File: ' + result.name + ' saved.');
                var urlPath = '/temp/'+ userId + '/' + result.name;
                resolve(urlPath);
            });
            /* var wstream = fs.createWriteStream(fileTemp);

             wstream.on('finish', function () {
             console.log('LOG5: write complete');
             resolve(fileTemp);
             });
             wstream.on('error', function (err) {
             console.log('LOG6: write errored');
             reject(err);
             });
             wstream.write(result) */
        })

    });
}