var update = require('./operation-controllers/user-update');
var retrieve = require('./operation-controllers/user-retrieve-saved');
var userDetails = require('./operations/user-details');
var create = require('./operations/user-create');
var remove  = require('./operations/user-remove');
var tasks = require('./operation-controllers/user-task.controller');
var reminders = require('./operation-controllers/user-reminder.controller');
var associateInternalId = require('./operations/add-userId-relation');

module.exports = {
    addReminder: reminders.add,
    addTask: tasks.add,
    associateInternalId: associateInternalId.handler,
    create: create.handler,
    deleteTask: tasks.delete,
    deleteReminder: reminders.delete,
    remove: remove.handler,
    retrieve: retrieve,
    update: update,
    updateTask: tasks.update,
    updateReminder: reminders.update,
    userDetails: userDetails.handler
};

/*
 var update = require('./operation-controllers/user-update');
 var retrieve = require('./operation-controllers/user-retrieve-saved');
 var userDetails = require('./operation-controllers/user-retrieve');
 var create = require('./operation-controllers/user-create');
 var remove  = require('./operation-controllers/user-remove');
 var tasks = require('./operation-controllers/user-task.controller');
 var reminders = require('./operation-controllers/user-reminder.controller');


 module.exports = {
 addReminder: reminders.add,
 addTask: tasks.add,
 create: create,
 deleteTask: tasks.delete,
 deleteReminder: reminders.delete,
 remove: remove,
 retrieve: retrieve,
 update: update,
 updateTask: tasks.update,
 updateReminder: reminders.update,
 userDetails: userDetails.handler
 };
 */