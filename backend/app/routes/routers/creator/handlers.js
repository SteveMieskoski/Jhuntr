var express = require('express');
var router = express.Router();
var multer = require("multer");
var Promise = require('bluebird');
var join = Promise.join;
var upload = multer({dest: 'public/image/'});

var creator = require('../../../controllers/creator/index');
var templates = require('../../../controllers/templates/index');


module.exports.routes = [
	{path: '/copy/:resId', verb: 'get', handler: creator.copy, router: 'creator'},
	{path: '/copyToPosting/:id', verb: 'get', handler: copyToPosting, router: 'creator'},
	{path: '/createNew/:id', verb: 'get', handler: creator.create, router: 'creator'},
	{path: '/createNewAlt/:userId/:schema', verb: 'post', handler: creator.createAlt, router: 'creator'},
	{path: '/getImage/:id', verb: 'get', handler: getImage, router: 'upload'},
	{path: '/list/:id', verb: 'get', handler: creator.list, router: 'creator'},
	{path: '/retrieve/:id', verb: 'get', handler: creator.retrieve, router: 'creator'},
	{path: '/retrieveMaster/:userId', verb: 'get', handler: creator.retrieveMaster, router: 'creator'},
	{path: '/remove/:id', verb: 'post', handler: creator.remove, router: 'creator'},
	{path: '/removeRes/:resId', verb: 'delete', handler: creator.removeRes, router: 'creator'},
	{path: '/add/:id/:section', verb: 'get', handler: creator.sectionCreate, router: 'creator'},
	{path: '/setMaster/:userId/:resId', verb: 'get', handler: creator.setMaster, router: 'creator'},
	{path: '/sectionsCreate/:id/:section', verb: 'get', handler: creator.sectionCreate, router: 'creator'},
	{path: '/image/:id', verb: 'post', handler: saveImage, router: 'upload'},
	{path: '/sectionsUpdate/:id', verb: 'put', handler: creator.sectionUpdate, router: 'creator'},
	{path: '/templateDetails/', verb: 'get', handler: templateDetails, router: 'creator'},
	{path: '/updateMeta/:id', verb: 'put', handler: creator.updateMeta, router: 'creator'},
	{path: '/update/:id', verb: 'put', handler: creator.update, router: 'creator'}
];


function copyToPosting(req, res) {
	console.log('/copyToPosting/:id', req.params.id);
	//arguments -> (userId, type, template)
	creator.copyToPosting(req.params.id)
		.then(function (result) {
			console.log('copy complete?');
			res.status(200).json({message: 'res list retrieved', data: result, result: true});
		})
		.catch(function (error) {
			console.log(error);
			reject(error);
		})
};

function getImage(req, res) {
	console.log("Get cake function");
	creator.getImage(req.params.id)
		.then(function (record) {
			var base64 = (record.img_data.toString('base64'));
			res.send(base64);
		})
		.catch(err => {
			console.log(err)
		});
};


function saveImage(req, res) {
	creator.saveImage(req.params.id, req.file.path, req.file.mimetype)
		.then(function (result) {
			console.log('saved');
			res.status(200).json({message: 'Attachments field created', data: result, result: true});
		})
		.catch(err => {
			console.log(err)
		});
};


function templateDetails(req, res) {
	console.log('/templateDetails/?name= &id=', req.query);
	//arguments -> (userId, type, template)
	var queryId = req.query.id ? req.query.id : null;
	var queryName = req.query.name ? req.query.name : null;
	templates.getDetails(queryId, queryName)
		.then(function (result) {
			res.status(200).json({message: 'res list retrieved', data: result, result: true});
		})
		.catch(function (error) {
			console.log(error);
			//res.status(200).json({message: 'template details retrieved', data: {name: 'core', photo_option: true}, result: true})
			reject(error);
		})
};


function updateLabel(req, res) {
	console.log('/updatelabel/:id', req.params.id);
	//arguments -> (userId)
	creator.updateLabel(req.params.id, req.body.newLabel)
		.then(function (result) {
			console.log('create', result);
			res.status(200).json({message: 'res list retrieved', data: result, result: true});
		})
		.catch(function (error) {
			console.log(error);
			reject(error);
		})
};



