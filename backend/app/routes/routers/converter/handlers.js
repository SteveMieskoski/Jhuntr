var express = require('express');
var router = express.Router();
var multer = require("multer");
var Promise = require('bluebird');
var join = Promise.join;
var upload = multer({dest: 'public/image/'});

//var winston = require('../../logger');
//var logger = winston.default;

var converter = require('../../../controllers/converter/index');

//module.exports = router;


module.exports.routes = [
	{path: '/downloadMain/:id', verb: 'get', handler: renderHtmlToPdf, router: 'converter'},
	{path: '/processed/:id/:postingId', verb: 'get', handler: renderhtml, router: 'converter'},
	{path: '/toEdit/:id', verb: 'get', handler: renderhtml, router: 'converter'},
	{path: '/file/:resId/:type', verb: 'get', handler: retrieveCreated, router: 'converter'}
];

function renderHtmlToPdf(req, res) {
	//arguments -> (resId, docUse, postingId, rawHtml)
	converter.renderHtmlToPdf(req.params.id, 'resume', false)
		.then(function (result) {
			res.status(200).json({pdfFile: result, result: true});
		})
		.catch(function (error) {
			console.log("renderHtmlToPdf", error);
			res.status(500).json({message: 'error: ' + error, result: false})
		})
};


function renderhtml(req, res) {
	//arguments -> (resId, editable, style)
	converter.renderhtml(req.params.id, true, undefined)
		.then(function (result) {
			res.status(200).json({htmlData: result, result: true});
		})
		.catch(function (error) {
			console.log("renderhtml", error);
			res.status(500).json({message: 'error: ' + error, result: false})
		})

};


function retrieveCreated(req, res) {
	converter.retrieveCreated(req.params.filename, req.params.filetype)
		.then(function (result) {
			res.send(result)
		})
		.catch(function (err) {
			console.log("retrieveCreated", err);
			res.status(500).json({message: 'error: ' + err, result: false})
		})
};


/*
 module.exports.toEdit = function (req, res) {
 //arguments -> (resId, editable, style)
 converter.renderhtml(req.params.id, true, undefined).then(function (result) {
 res.status(200).json({htmlData: result, result: true})
 })

 };
 */
