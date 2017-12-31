var express = require('express');
var router = express.Router();
var listorRouter = express.Router();
var chromeRouter = express.Router();


//module.exports.listor = listorRouter;
var posting = require('./handlers');
var middleware = require('../../../middleware/index');

var routers = module.exports = {
    posting: router,
    listor: listorRouter,
    chrome: chromeRouter
};

for(var i=0; i<posting.routes.length; i++){
    console.log(posting.routes[i].router);
    if(posting.routes[i].hasOwnProperty('middleware')){
        console.log(typeof posting.routes[i].handler);
        routers[posting.routes[i].router][posting.routes[i].verb](posting.routes[i].path, middleware[posting.routes[i].middleware], posting.routes[i].handler);
    } else {
        routers[posting.routes[i].router][posting.routes[i].verb](posting.routes[i].path, posting.routes[i].handler);
    }

}

// = routers;
/*
router.get('/getImage/:id', posting.getImage);
//router.get('/getStatuses/:statusId', posting.getStatuses);


router.post('/update/:id', posting.update);
router.post('/updateStatuses/:statusId', posting.updateStatuses);
router.post('/updatePostTaskList/:userId/:postId', posting.updatePostTaskList);
router.post('/addPlainPost/:userId/:status', posting.addPlainPost);
router.post('/updateRemarks/:id', posting.updateRemarks);

router.post('/image/:id',
    // TEMPORARILY COMMENTED (UNTIL ERROR RESOLVED)
    /*middleware.uploadFile(req, res, function (err) {
        if (err) {
            console.log('image upload error', err);
            res.json({error_code: 1, err_desc: err});
            return;
        }

    }),*/
/*
    posting.image
);

router.post('/manualUpload',
    // TEMPORARILY COMMENTED (UNTIL ERROR RESOLVED)
    /*middleware.uploadFile(req, res, function (err) {
     if (err) {
     console.log('image upload error', err);
     res.json({error_code: 1, err_desc: err});
     return;
     }

     }),*/
/*
    posting.manualUpload
);

router.post('/uploadResume/:postId',
    // TEMPORARILY COMMENTED (UNTIL ERROR RESOLVED)
    /*middleware.uploadFile(req, res, function (err) {
     if (err) {
     console.log('image upload error', err);
     res.json({error_code: 1, err_desc: err});
     return;
     }

     }),*/
/*
    posting.uploadResume
);

router.post('/addImage',
    // TEMPORARILY COMMENTED (UNTIL ERROR RESOLVED)
    /*middleware.uploadFile(req, res, function (err) {
     if (err) {
     console.log('image upload error', err);
     res.json({error_code: 1, err_desc: err});
     return;
     }

     }),*/
/*
    posting.addImage
);

router.post('/manualUploadPdf',
    // TEMPORARILY COMMENTED (UNTIL ERROR RESOLVED)
    /*middleware.uploadFile(req, res, function (err) {
     if (err) {
     console.log('image upload error', err);
     res.json({error_code: 1, err_desc: err});
     return;
     }

     }),*/
/*
    posting.manualUploadPdf
);


router.delete('/removePosting/:postId/:userId', posting.removePosting);



// PREVIOUSLY IN LISTOR CONTROLLER (LISTOR ROUTES)




listorRouter.get('/list/:id/', posting.listorList );

listorRouter.get('/retrieveOnePost/:id/', posting.listorRetrieveOnePost );

listorRouter.get('/checkPost/:id/', posting.listorCheckPost );


listorRouter.delete('/removeRes/:id/:post', posting.listorRemoveRes);

console.log(router);
    */
