var express = require('express');
var router = express.Router();
var request = require('request');

// TODO COMMENTED OUT AS A RESULT OF THE ERROR EMANATING FROM email.controller.js
//var emailController = require('../controllers/email.controller');

module.exports = router;


router.post('/support', function(req, res){
    console.log(req.body);
    //  emailController.supportRequest(req, res);
});

router.post('/contact', function(req, res){
    console.log(req.body);
    //  emailController.supportRequest(req, res);
});