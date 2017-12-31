

var pathHelper = require('../../utils/path-helper');
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

function imageFileFilter(req, file, cb){
    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted



    var mimetypes = [
        "image/png",
        "image/jpeg"
    ];

    console.log(file.mimetype);
    if(mimetypes.indexOf(file.mimetype) > -1){
        // To reject this file pass `false`, like so:
        cb(null, true);
    } else {
        // To accept the file pass `true`, like so:
        cb(null, false);
    }





    // You can always pass an error if something goes wrong:
  //  cb(new Error('I don\'t have a clue!'))
};

exports.public = multer({dest: pathHelper.root('public', 'image')});

exports.file = multer({ //multer settings
    storage: multerStorage,
    fileFilter: fileFilter
}).single('file');

exports.image = multer({ //multer settings
    storage: multerStorage,
    fileFilter: imageFileFilter
}).single('file');