var Promise = require('bluebird');
var fs = require('fs-extra');
var path = require('path');
//var winston = require('../../../logger');
//var logger = winston.default;
var pathHelper = require('../../../utils/path-helper');

var resModels = require('../../../../database').resSchema;
var postingModel = require('../../../../database').postingSchema.posting;

var dataPrep = require('./template-data-prep');
var htmlToPdf = require('./htmlToPdf');

module.exports = function (resId, docUse, postingId, rawHtml) {
	console.log('render-html-to-pdf'); // todo remove debug item
	return new Promise(function (resolve, reject) {
		var fileUse = docUse ? docUse : 'resume';
		if (postingId && rawHtml !== undefined) {
			var dataIn = {objectId: resId, fileUse: fileUse, data: rawHtml};
			parseHtml(dataIn)
				.then(function (createdFileName) {
					if (postingId && fileUse === 'resume') {
						addResumeRef(postingId, createdFileName).then(function (result) {
							resolve(createdFileName);
						})
					} else if (postingId && fileUse === 'coverLetter') {
						addLetterRef(postingId, createdFileName).then(function (result) {
							resolve(createdFileName);
						})
					} else {
						reject('request missing postingId or fileUse')
					}

				})
				.catch(function (err) {
					console.log('renderToDownload: parse html error', err);
					reject(err);
				});
		} else {
			console.log('resId:', resId); // todo remove debug item
			resModels.resume.find({_id: resId})
				/* .populate('basics location profiles employment volunteer education awards publications skills languages interests references affiliations examples governance labels design attachments strengths courses projects technologies highlights achievements')*/
				.exec()
				.then(function (info) {
					console.log(info);
					console.log("technologies", info[0].technologies);
					if (!info) {
						console.log('No Date Retrieved');
						reject('No Date Retrieved');
					}
					console.log('RETRIEVED DATA FOR PDF CREATION', info[0].languages);
					return dataPrep.prepare(info, false).then(function (html) {
						//console.log(html);
						var dataIn = {objectId: resId, fileUse: fileUse, data: html, priorPdf: info[0].pdf_ref};
						parseHtml(dataIn).then(function (createdFileName) {
							console.log('created filename', createdFileName);
							resolve(createdFileName);

						}).catch(function (err) {
							console.log('renderToDownload: parse html error', err);
							reject(err);
						});

					}).catch(function (err) {
						console.log('renderToDownload: process data prepare/create template error', err);
						reject(err);
					});
				})
				.catch(function (err) {
					console.log('renderToDownload: retrieve error', err); //error is occuring here
					reject(err);
				});
		}


	})
};


function parseHtml(refs) {
	return new Promise(function (resolve, reject) {

		if (refs.objectId && refs.fileUse && refs.data) {
			createTempFile(refs)
				.then(function (tempFileName) {
					var savedFileName = Date.now() + '-' + refs.objectId + '-' + refs.fileUse;
					console.log("savedFileName", savedFileName);
					htmlToPdf.createPdf(tempFileName, savedFileName)
						.then(function (createResult) {
							if(createResult){
								console.log('saved filename', savedFileName);
								return resModels.resume.findById(refs.objectId)
									.exec()
									.then(function (result) {
										//   console.log('TEMP FILE NAME', pathHelper.root(tempFileName));

										/*     fs.stat(pathHelper.root(tempFileName), function (err, statsTemp) {
												 if (statsTemp.isFile()) {
													 fs.remove(pathHelper.root(tempFileName), function (err) {
														 if (err) return console.error(err);
													 });
												 }
											 });*/
										if (refs.priorPdf) {
											console.log(refs.priorPdf);
											return removePriorPdf(refs.priorPdf)
												.then((thing) => {
												console.log("thing", thing);
												return thing
												})
												.catch(err => {
													console.log('err', err);
													return false;
												})
											// console.log('PDF_REF ?', result.pdf_ref);
											//  console.log('? PRIOR DATA:', refs.priorPdf);
											/*fs.stat(pathHelper.root(refs.priorPdf), function (err, statsPdf) {
												//      console.log('? PRIOR DATA:', refs.priorPdf);
												if (statsPdf.isFile()) {
													fs.remove(pathHelper.root(refs.priorPdf), function (err) {
														if (err) {
															console.error(err);
															return false;
														}
														return true;
													});
												}
											})*/
										} else {
											return true;
										}
									});
								//  logger.silly('create pdf completed for:', refs.objectId, 'with use:', refs.fileUse);
							} else {
								return false;
							}

						})
						.then(function (createResult) {
							console.log("CREATE RESULT", createResult);
							if(createResult){
								var newFile = process.env.SAVE_PDF_BASE + savedFileName + '.pdf';
								var updateResRef = resModels.resume.findByIdAndUpdate(refs.objectId, {$set: {pdf_ref: newFile}});
								return updateResRef
									.exec()
									.then(function (data) {
										resolve(newFile);
									})
									.catch(function (error) {
										console.log('parseHtml 0: error updating res ref', error);
										reject(false);
									})
							} else {
								reject(false);
							}

						})
						.catch(function (error) {
							console.log('parseHtml 1: error creating pdf', error);
							reject(false);
						})
				})
				.catch(function (error) {
					console.log('parseHtml 2: error creating temp file', error);
					reject(false);
				})
		} else {
			console.log('parseHtml 4: error, failed check if statement');
			reject();
		}

	})

}


function createTempFile(refs) {
	return new Promise(function (resolve, reject) {
		console.log('creating text');
		// console.log('createTempFile', refs.data);
		var tmpFile = process.env.PDF_TEMP_FILE_BASE + refs.objectId + refs.fileUse + '.html';
		console.log('temp filename', tmpFile);
		console.log("cwd", process.cwd());
		var fileRoot;
		if(path.resolve(process.cwd(), "..") === path.resolve(pathHelper.root('/'), "..")){
			console.log("ok");
			fileRoot = path.resolve(pathHelper.root('/'), "..") + "/"
		} else {
			fileRoot = pathHelper.root("/")
		}
		console.log("_root", pathHelper.root('/'));
		fs.writeFile(fileRoot + tmpFile, refs.data, function (err, data) {
			if (err) {
				console.log(err);
				reject(err);
			}
			console.log(data);
			console.log('creating pdf');
			console.log('create pdf tempfile created for:', refs.objectId);
			resolve(tmpFile);
		});
	})
}


function removePriorPdf(priorPdf){
	return new Promise((resolve, reject) => {
		fs.access(pathHelper.root(priorPdf), fs.constants.F_OK, (err) => {
			if (!err) {
				fs.remove(pathHelper.root(priorPdf), function (err) {
					if (err) {
						console.error(err);
						// return false;
						reject(err)
					}
					// return true;
					resolve(true)
				});
			} else {
				// Not sure if this should return true, but if the file no longer exists then
				// it would be ok. however, if it is a path issue... that is something that should be
				// handled, but not critical.
				// return true;
				resolve(true)
			}
		})
	})

}

function addResumeRef(postingId, newId) {
	var updateResRef = postingModel.findByIdAndUpdate(postingId, {$set: {resume_ref: newId}});
	return updateResRef.exec();
}

function addLetterRef(postingId, newId) {
	var updateCoverRef = postingModel.findByIdAndUpdate(postingId, {$set: {coverLetter_ref: newId}});
	return updateCoverRef.exec();
}