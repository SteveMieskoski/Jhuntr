var express = require('express');
var router = express.Router();
var multer = require("multer");
var Promise = require('bluebird');
var join = Promise.join;
var fs = require('fs');
var pathHelper = require('../../../utils/path-helper');
var Busboy = require('busboy');
var inspect = require('util').inspect;
var os = require('os');
var path = require('path');
console.log(pathHelper.root('public', 'image/'));
var multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, pathHelper.root('page_images/'))
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }

});
var upload = multer({ //multer settings
    storage: multerStorage
}).single('file');


//module.exports = router;

var user = require('../../../controllers/user/index');
var oldUserController = require('../../../controllers/user/operation-controllers/old-user-controller');

module.exports.routes = [
    {path: '/addTask/:id', verb: 'post', handler: addTask, router: 'user'},
    {path: '/addReminder/:id', verb: 'post', handler: addReminder, router: 'user'},
    {path: '/associate', verb: 'post', handler: user.associateInternalId, router: 'user'},
    {path: '/createUser', verb: 'post', handler: user.create, router: 'user'},
    {path: '/deleteTask/:id', verb: 'delete', handler: deleteTask, router: 'user'},
    {path: '/deleteReminder/:id', verb: 'delete', handler: deleteReminder, router: 'user'},
    {path: '/removeSkill/:id', verb: 'put', handler: removeSkill, router: 'user'},
    {path: '/delete/:id', verb: 'delete', handler: user.remove, router: 'user'},
    {path: '/:id', verb: 'get', handler: retrieve, router: 'user'},
    {path: '/update/:id', verb: 'put', handler: update, router: 'user'},
    {path: '/updateTask/:id', verb: 'put', handler: updateTask, router: 'user'},
    {path: '/updateReminder/:id', verb: 'put', handler: updateReminder, router: 'user'},
    {path: '/updateSkills/:id', verb: 'put', handler: updateUserSkills, router: 'user'},
    {path: '/details/:id', verb: 'get', handler: user.userDetails, router: 'user'}
];
//module.exports = router;


function addTask(req, res) {
    console.log('user/addTask/:id', req.params.id);
    user.addTask(req.params.id, req.body).then(function (result) {
        res.status(200).json({message: 'user created', data: result, result: true});
    }).catch(function (error) {
        res.status(500).json({message: 'error occured on task create', data: error, result: false})
    });
};

function addReminder(req, res) {
    user.addReminder(req.params.id, req.body).then(function (result) {
        res.status(200).json({message: 'user created', data: result, result: true});
    }).catch(function (error) {
        res.status(500).json({message: 'error occured on reminder create', data: error, result: false})
    });
};

function create(req, res) {

    user.create(req.body.user_id, req.body).then(function (result) {
        res.status(200).json({message: 'user created', data: result, result: true});
    }).catch(function (error) {
        res.status(500).json({message: 'error occured on user create', data: error, result: false})
    });

};


function deleteTask(req, res) {
    console.log('user/deleteTask/:id', req.params.id);
    user.deleteTask(req.params.id).then(function (result) {
        res.status(200).json({message: 'user created', data: result, result: true});
    }).catch(function (error) {
        res.status(500).json({message: 'error occured on task create', data: error, result: false})
    });
};

function deleteReminder(req, res) {
    res.status(200)
};

function removeSkill(req, res) {
    console.log('user/removeSkill/:id', req.params.id);
    oldUserController.removeSkill(req, res);
};


function remove(req, res) {
    console.log('user/delete/:id', req.params.id);
    user.remove(req.params.id).then(function (result) {
        res.status(200).json({message: 'user removed', data: result, result: true});
    }).catch(function (error) {
        res.status(500).json({message: 'error occured on user remove', data: error, result: false})
    });
};

function retrieve(req, res) {
    console.log('user/:id', req.params.id);
    user.retrieve(req.params.id, res).then(function (result) {
        res.status(200).json({message: 'user data retrieved', data: result, result: true});
    }).catch(function (error) {
        res.status(500).json({message: 'error occured on user data retrieve', data: error, result: false})
    });
};


function update(req, res) {
    console.log('user/update/:id', req.params.id);
    user.update(req.params.id, req.body).then(function (result) {
        res.status(200).json({message: 'user updated', data: result, result: true});
    }).catch(function (error) {
        res.status(500).json({message: 'error occured on user update', data: error, result: false})
    });
};

function updateTask(req, res) {
    console.log('user/updateTask/:id', req.params.id);
    user.updateTask(req.params.id, req.body).then(function (result) {
        res.status(200).json({message: 'user created', data: result, result: true});
    }).catch(function (error) {
        res.status(500).json({message: 'error occured on task create', data: error, result: false})
    });
};

function updateReminder(req, res) {
    user.updateReminder(req.params.id, req.body).then(function (result) {
        res.status(200).json({message: 'user created', data: result, result: true});
    }).catch(function (error) {
        res.status(500).json({message: 'error occured on reminder create', data: error, result: false})
    });
};

function updateUserSkills(req, res) {
    console.log('user/updateSkills/:id', req.params.id);
    oldUserController.updateUserSkills(req, res);
};

function userDetails(req, res) {
    console.log('user/details/:id', req.params.id);
    user.userDetails(req.params.id, res).then(function (result) {
        res.status(200).json({message: 'user data retrieved', data: result, result: true});
    }).catch(function (error) {
        res.status(500).json({message: 'error occured on user data retrieve', data: error, result: false})
    });
};



