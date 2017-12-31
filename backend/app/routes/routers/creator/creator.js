var express = require('express');
var router = express.Router();
var uploadRouter = express.Router();


var middleware = require('../../../middleware/index');
var creator = require('./handlers');

//module.exports = router;
//module.exports.upload = uploadRouter;
var routers = {
    creator: router,
    upload: uploadRouter
};

for(var i=0; i<creator.routes.length; i++){
    console.log(creator.routes[i].verb);
    routers[creator.routes[i].router][creator.routes[i].verb](creator.routes[i].path, creator.routes[i].handler);
}

module.exports = routers;


/*
router.get('/list/:id/', creator.list);
router.get('/templateDetails/', creator.templateDetails);
router.get('/copyToPosting/:id', creator.copyToPosting);
router.get('/copy/:id', creator.copy);
router.get('/createNew/:id', creator.createNew);
router.get('/retrieve/:id', creator.retrieve);
router.get('/add/:id/:section', creator.addSection);
router.get('/setMaster/:userId/:resId', creator.setMaster);
router.get('/retrieveMaster/:userId', creator.retrieveMaster);
router.get('/sectionsCreate/:id/:section', creator.sectionsCreate);

router.post('/remove/:id',  creator.remove);

router.put('/updatelabel/:id', creator.updateLabel);
router.put('/update/:id', creator.update);
router.put('/sectionsUpdate/:id', creator.sectionsUpdate);

router.delete('/removeRes/:id/:user', creator.resRemove);

uploadRouter.post('/image/:id',
  //  middleware.uploadImage
    /*(req,res,function(err){
        if(err){
            console.log('image upload error', err);
            res.json({error_code:1,err_desc:err});
            return;
        }
    })*/
   // ,
/*
        creator.image
);

uploadRouter.get('/getImage/:id', creator.getImage);

    */