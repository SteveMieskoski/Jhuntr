var fs = require('fs-extra');
var EventEmitter = require('events');
var emitEvent = new EventEmitter();

module.exports = emitEvent;

//module.exports = deleteTimer;


emitEvent.on('addTimer', function(data){
    console.log('add timer data:', data);
    deleteTimer(data);
});

function deleteTimer(dir){
    setTimeout(deleteDir, 30000, dir)
}

function deleteDir(dir){
    fs.remove(dir, function(err, result) {
        if(err) {
            console.log('deleteDir Error', err);
        }
            console.log('===================================== DIRECTORY %s DELETED ===========================================', dir);
        })
}