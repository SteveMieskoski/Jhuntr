
var multer = require("multer");


var multerStorage = multer.memoryStorage();

var multerLimits = {

};

function fileFilter(req, file, cb){
    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted

    // To reject this file pass `false`, like so:
    var mimetypes = [
        "application/msword",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/x-iwork-pages-sffpages",
        "application/pdf"

    ];
    cb(null, false);

    // To accept the file pass `true`, like so:
    cb(null, true);

    // You can always pass an error if something goes wrong:
    cb(new Error('I don\'t have a clue!'))
};


module.exports = multer({ //multer settings
    storage: multerStorage,
    fileFilter: fileFilter
});

/*
module.exports = multer({ //multer settings
    storage: multerStorage,
    fileFilter: fileFilter
}).single('file');
    */