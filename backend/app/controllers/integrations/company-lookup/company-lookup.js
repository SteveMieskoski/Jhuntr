var clearbit = require('clearbit')(process.env.CLEARBIT_API_KEY);
var request = require('request');
var rp = require('request-promise');
var Promise = require('bluebird');

var cacheData = require('../utils/cache-listeners');

module.exports.handler = companyLookupApiHandler;

// ============================= Dev Experimenting (requires start) ==================================
var EventEmitter = require('events');
var devEvent = new EventEmitter();
var wdk = require('wikidata-sdk');
// ============================= Dev Experimenting  (requires end) ==================================
function companyLookupApiHandler(req, res) {
    corpwatchCompanyLoopup(req.body.name)
    // clearBitCompanyLookup(req.body.domain)
        .then(function (result) {
            console.log('company lookup response');
            res.status(200).json({message: 'res updated', data: result, result: true});
        })
        .catch(function (error) {
            if (error.type === 'not found') {
                res.status(200).json({message: 'company not found', data: {name: 'not found'}, result: true});
            } else {
                console.log('LOG1: ', error);
                res.status(500).json({error: error, result: false})
            }

        })

}

function corpwatchCompanyLoopup(companyName) {
    return new Promise(function(resolve, reject){
    var apiKeyParam = '&key=' + process.env.CORPWATCH_API_KEY;
    // return new Promise(function (resolve, reject) {
    // http://api.corpwatch.org/2008/companies.json?company_name=safeway+inc
    var encodedName = encodeURIComponent(companyName).replace(/%20/g, '+');
    console.log('encodedName', encodedName);
    var url = "http://api.corpwatch.org/companies.json?company_name=" + encodedName + apiKeyParam;
    console.log(companyName, ' and ', url);
   // devEvent.emit('devyData', companyName);
    var options = {
        method: 'GET',
        uri: url,
        json: true // Automatically parses the JSON string in the response
    };
    if(companyName || companyName !== ''){
        return rp(options)
            .then(function (response) {
                console.log(Object.keys(response));

                parseResult(response);
                var companyRaw = response.result.companies;
                var cwIDs = Object.keys(response.result.companies);
                var countries = {};
                var parentCompanies = [];
                var subsidiaries = [];
                for (var i = 0; i < cwIDs.length; i++) {
                    var keys = Object.keys(countries);
                    var code = companyRaw[cwIDs[i]].country_code;
                    var data = companyRaw[cwIDs[i]];
                    if(data.irs_number){
                        if (data.source_type === 'filers') {
                            parentCompanies.push(data);
                        }

                        if (data.source_type === 'relationships') {
                            subsidiaries.push(data);
                        }


                        if (keys.indexOf(code) >= 0) {
                            // console.log('exists', countries[code].length);
                            countries[code].push(data);
                        } else {
                            countries[code] = [];
                            // console.log('create', countries[code].length);
                            countries[code].push(data);
                        }
                    }

                }
                /*   var cwIDs = Object.keys(companyRaw);
                 var company = companyRaw[cwIDs[0]];
                 console.log('CompanyData', company);
                 console.log('Name: ', company.company_name);
                 console.log('Address:', company.raw_address);
                 */
                //  cacheData.emit('companyData', company);
                resolve({
                    exists: true,
                    rawResponse: response,
                    raw: companyRaw,
                    parentCompanies: parentCompanies,
                    subsidiaries: subsidiaries,
                    countries: countries
                });

                //reject();
            })
            .catch(function (err) {
                console.log('[INTERNAL REPORT] Bad/invalid request, unauthorized, or failed request');
                console.log('[INTERNAL REPORT]', err);
                reject({type: '[INTERNAL REPORT] CorpWatch Error', error: err});
            });
    } else {
        resolve({
            exists: false
        });
    }

    })
}

function parseResult(response){
    setTimeout(function(){
        if(response){
            console.log('parse response response',response);
        } else {
            parseResult(response);
        }
    }, 10, response)
}


function clearBitCompanyLookup(companyDomain) {
    // Should Collect These Results In a collection. Basically a cache, with duplicates checked by the id property in the response
    return new Promise(function (resolve, reject) {
        var Company = clearbit.Company;
        Company.find({domain: companyDomain})
            .then(function (company) {
                console.log('Name: ', company.name);
                cacheData.emit('clearBitCompanyData', company);
                resolve(company);
            })
            .catch(Company.QueuedError, function (err) {
                console.log(err); // Company is queued
                reject({type: 'queued error', error: err})
            })
            .catch(Company.NotFoundError, function (err) {
                console.log(err); // Company could not be found
                reject({type: 'not found', error: err});
            })
            .catch(function (err) {
                console.log('Bad/invalid request, unauthorized, Clearbit error, or failed request');
                reject({type: 'ClearBit true error', error: err});
            });
    })

}

function clearBitLogoSearch() {
    var url = 'https://autocomplete.clearbit.com/v1/companies/suggest?query=';


    var options = {
        method: 'GET',
        uri: url
    };
    return rp(options); // returns a promise


}


// ============================= Dev Experimenting (functions start) ==================================

devEvent.on('devyData', function (data) {
    console.log(data);
  /* const url = wdk.getWikidataIdsFromWikipediaTitles({
        titles: 'Google',
        sites: 'enwiki',
        languages: ['en'],
        props: ['info', 'claims'],
        format: 'json'
    });
   const url = wdk.searchEntities({
        search: 'google',
        format: 'json'
    });*/
    const url = wdk.getWikidataIdsFromWikipediaTitles('Google');
    var devOptions = {
        method: 'GET',
        uri: url,
        json: true
    };
    rp(devOptions)
        .then(function (result) {
            console.log('dev response:', result);
            var entity = Object.keys(result.entities);
            var claims = wdk.simplify.claims(result.entities[entity[0]].claims);
            if(Object.keys(claims).indexOf('P154') >= 0){
                console.log('logos', claims['P154']);
            }
          //  console.log('simplify claims', );


         //   console.log('entity', Object.keys(result.entities)[0]);
         //   console.log('entity:', wdk.simplify.entity(result.search[0]));
            //wdk.simplify.entity(Object.keys(result.entities))
          //  console.log('claims', wdk.simplify.claims(result.search[0].claims));
         //  console.log('labels:', wdk.simplify.labels(result.search[0]));

        })
        .catch(function (error) {
            console.log('dev error:', error);
        })
});

/*
 ?com wdt:P279 wd:P154 .
 ?com p:Q783794 ?logo.
 */
// ============================= Dev Experimenting (functions end) ==================================
