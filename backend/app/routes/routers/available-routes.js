

exports.paths = [
    {path: "/user/updateTask/:id"},
    {path: "/user/updateSkills/:id"},
    {path: "/user/updateReminder/:id"},
    {path: "/user/update/:id"},
    {path: "/user/removeSkill/:id"},
    {path: "/user/details/:id"},
    {path: "/user/deleteTask/:id"},
    {path: "/user/deleteReminder/:id"},
    {path: "/user/addTask/:id"},
    {path: "/user/addReminder/:id"},
    {path: "/user/:id"}
];
exports.upload = [
    {path: "/upload/image/:id"}
];
exports.posting = [
    {path: "/posting/updateStatuses/:statusId"},
    {path: "/posting/updatePostTaskList/:userId/:status"},
    {path: "/posting/update/:id"},
    {path: "/posting/update/:id"},
    {path: "/posting/removePosting/:postId/:userId"},
    {path: "/posting/getStatuses/:userIdExt"},
    {path: "/posting/addPlainPost/:userId/:status"}
];
exports.listor = [
    {path: "/listor/retrieveOnePost/:id", alias: ''},
    {path: "/listor/removeRes/:id/:post"},
    {path: "/listor/removeRes/:id/:post"},
    {path: "/listor/list/:id?field=tasks"},
    {path: "/listor/list/:id?field=reminders"},
    {path: "/listor/list/:id"},
    {path: "/listor/list/:id"},
    {path: "/listor/checkPost/:id"},
    {path: "/listor/checkPost/:id"},
    {path: "/listor/checkPost/:id"},
    {path: "/listor/checkPost/:id"}
];
exports.email = [
    {path: "/email/:route"}
];
exports.db = [
    {path: "/db/list/:id"},
    {path: "/db/file/:resId/:type"},
    {path: "/db/CreateUser"}
];
exports.creator = [
    {path: "/creator/updatelabel/:id"},
    {path: "/creator/update/:id"},
    {path: "/creator/templateDetails/"},
    {path: "/creator/templateDetails/"},
    {path: "/creator/setMaster/:userId/:resId"},
    {path: "/creator/sectionsUpdate/:id"},
    {path: "/creator/sectionsCreate/:id/:section"},
    {path: "/creator/retrieveMaster/:userId"},
    {path: "/creator/retrieveMaster/:userId"},
    {path: "/creator/retrieve/:id"},
    {path: "/creator/retrieve/:id"},
    {path: "/creator/retrieve/:id"},
    {path: "/creator/removeRes/:id/:user"},
    {path: "/creator/remove/:id"},
    {path: "/creator/list/:id"},
    {path: "/creator/list/:id"},
    {path: "/creator/createNew/:id"},
    {path: "/creator/copy/:id"},
    {path: "/creator/copy/:id"},
    {path: "/creator/copy/:id"},
    {path: "/creator/add/:id/:section"}
];
exports.converter = [
    {path: "/converter/downloadMain/:id"}
];
