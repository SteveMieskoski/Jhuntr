var express = require('express');
var router = express.Router();

//module.exports = router;
var user = require('./handlers');
var middleware = require('../../../middleware/index');

var routers = {
    user: router,
};

for(var i=0; i<user.routes.length; i++){
    console.log(user.routes[i].verb);
    routers[user.routes[i].router][user.routes[i].verb](user.routes[i].path, user.routes[i].handler);
}

module.exports = routers;

/*
router.get('/:id', user.user);

router.get('/details/:id', user.details);

router.post('/createUser', user.createUser );

router.put('/update/:id', user.update);

router.put('/updateSkills/:id', user.updateSkills);

router.put('/removeSkill/:id', user.removeSkill);

router.delete('/delete/:id', user.delete);

router.post('/addTask/:id', user.addTask);

router.put('/updateTask/:id', user.updateTask);

router.delete('/deleteTask/:id', user.deleteTask);

router.post('/addReminder/:id', user.addReminder);

router.put('/updateReminder/:id', user.updateReminder);

router.delete('/deleteReminder/:id', user.deleteReminder);

*/


