var EventEmitter = require('events');
var emitEvent = new EventEmitter();

var companyData = require('../../../../database').dataSchema;
var dataCaches = require('./cache-data');
module.exports = emitEvent;

emitEvent.on('clearBitCompanyData', function(data){
    dataCaches.clearBit(data)
        .then(function(success){
            console.log(success);
            if(success){
                console.log('company cache response:', success);
            } else {
                console.log('company data present');
            }
        })
        .catch(function(error){
            console.log('company cache error:', error);
        })
});


emitEvent.on('clearBitCompanyData', function(data){
    dataCaches.corpWatch(data)
        .then(function(success){
            console.log(success);
            if(success){
                console.log('company cache response:', success);
            } else {
                console.log('company data present');
            }
        })
        .catch(function(error){
            console.log('company cache error:', error);
        })
});


