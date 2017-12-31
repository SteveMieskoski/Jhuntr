var download = require('./dropbox/download');
var companyLookup = require('./company-lookup/company-lookup');

module.exports = {
    download: download.handler,
    companyLookup: companyLookup.handler
};