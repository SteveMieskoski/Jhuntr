

var companyData = require('../../../../database').dataSchema;

module.exports = {
    clearBit: clearBitCacheData,
    corpWatch:corpWatchCacheData
}

function clearBitCacheData(data) {
    return new Promise(function (resolve, reject) {
        companyData.incData.find({id: data.id})
            .exec()
            .then(function (found) {
                console.log('found', found.length);
                if (found.length > 0) {
                    console.log('found true');
                    resolve();
                } else {
                    var newData = companyData.incData(data);
                    newData
                        .save()
                        .then(function (saved) {
                            resolve(saved);
                        })
                        .catch(function(error){
                            console.log('error caching company data', error);
                            resolve();
                        })
                }

            })
            .catch(function(error){
                console.log('error finding if a company id exists', error);
                resolve();
            })
    })

}







function corpWatchCacheData(data) {
    return new Promise(function (resolve, reject) {
        companyData.incData.find({id: data.id})
            .exec()
            .then(function (found) {
                console.log('found', found.length);
                if (found.length > 0) {
                    console.log('found true');
                    resolve();
                } else {
                    var newData = companyData.incData(data);
                    newData
                        .save()
                        .then(function (saved) {
                            resolve(saved);
                        })
                        .catch(function(error){
                            console.log('error caching company data', error);
                            resolve();
                        })
                }

            })
            .catch(function(error){
                console.log('error finding if a company id exists', error);
                resolve();
            })
    })

}

/*
var EventEmitter = require('events');
var emitEvent = new EventEmitter();
module.exports = emitEvent;

emitEvent.on('clearBitCompanyData', function(data){
    clearBitCacheData(data)
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
    corpWatchCacheData(data)
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

    */