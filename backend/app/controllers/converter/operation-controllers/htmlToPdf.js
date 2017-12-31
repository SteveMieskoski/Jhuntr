var fs = require('fs-extra');
var pdf = require('html-pdf');
var mongoose = require('mongoose');
var path = require('path');
mongoose.Promise = require('bluebird');
var postingModel = require('../../../../database').postingSchema.posting;
var Promise = require('bluebird');
var dotenv = require('dotenv');
var pathHelper = require('../../../utils/path-helper');
var spawn = require('child_process').spawn;
var wkhtmltopdf = require('wkhtmltopdf');
//dotenv.load();


module.exports.createPdf = createPdf;


// VIA PHANTOMJS AND phantomDriver.js
function createPdf(tempFileName, saveFileName) {
	console.log('htmlToPdf'); // todo remove debug item
	return new Promise(function (resolve, reject) {
		//  var page = phantomjs.create();
		checkForTempFile(tempFileName)
			.then((tempFilePath) => {
				// console.log("checkForTempFile", tempFilePath);
				// var tempPath = pathHelper.root(tempFileName);
				console.log('tempfilePath=', tempFilePath);
				var savePath = pathHelper.root(process.env.SAVE_PDF_BASE + saveFileName + '.pdf');
				//var  savePath = process.env.SAVE_PDF_BASE + saveFileName + '.pdf';
				var phantomDriverPath = __dirname + '/phantomDriver.js';
				var child = spawn('phantomjs', [phantomDriverPath, tempFilePath, savePath, "Letter"]);
				//, "8.5in*11in"
				child.stdout.on('data', function (data) {
					console.log('from child process: ', data.toString());
				});

				child.stdin.on('data', function (data) {
					console.log('Stdin received', data);
				});

				child.stderr.on('data', function (data) {
					console.log(data);
					reject('Error Converting PDF');
					console.log('from child error', data.toString());
				});

				child.on('close', function (closed) {
					console.log(closed);
					if (closed === 100) {
						resolve(false)
					}
					setTimeout(function () {
						resolve(true);
					}, 10000)
				});
			})
			.catch(err => {
				console.log(err);
				resolve(false);
			});




		//  page.setContent(content, 'http://www.example.com');
		//   page.viewportSize = {width: 1920, height: 1080};
		//   page.render(saveFileName, {format: 'pdf', quality: '100'});
		//   phantom.exit();
		//  resolve(true);
	});

}


function checkForTempFile(fileName) {
	return new Promise((resolve, reject) => {
		var filePath = pathHelper.root(fileName);
		fs.access(filePath, fs.constants.F_OK, (err) => {
			console.log(err ? 'no access!' : 'can read/write');
			if (err) {
				var fileRoot = path.resolve(pathHelper.root('/'), "..") + "/";
				filePath = fileRoot + fileName;
				console.log("altFilePAth", filePath);
				fs.access(filePath, fs.constants.F_OK, (err) => {
					console.log(err ? 'no access!' : 'can read/write');
					return !err ? resolve(filePath) : reject();
					/* if(err){

					 } else {

					 }*/
				})
			} else {
				resolve(filePath)
			}
		})
	})
}
