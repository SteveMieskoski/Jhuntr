var fs = require('fs');
var _ = require('lodash');
const exec = require('child_process').exec;


var dotenv = require('dotenv');
//dotenv.load();

module.exports.parseIncomming = parseIncomming;

function parseIncomming(req, res){
    var fileContent = req.body.output;
    var fileName = req.body.filename ? req.body.filename : 'tempFileName';
    createTexOut(fileName, fileContent)
}


function createTexOut(fileName, fileContent){
    var writeStream = fs.createWriteStream('backend/TexOutput/' + fileName + '.tex');
    writeStream.write(fileContent);

    exec('sh backend/TexOutput/compileLatex.sh', function (error, stdout, stderr) {
        if (error) {
            console.error('exec error:' + error);
            return;
        }
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
    });
}

