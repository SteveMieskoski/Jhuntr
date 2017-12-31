var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;


var CompanySchema = new mongoose.Schema(
    {
        "id": {type: String, default: ''},
        "name": {type: String, default: ''},
        "legalName": {type: String, default: ''},
        "domain": {type: String, default: ''},
        "domainAliases": {type: Array, default: []},
        "site":  {type: Object, default: {}},
        "category":  {type: Object, default: {}},
        "tags": {type: Array, default: []},
        "description": {type: String, default: ''},
        "foundedYear": {type: Number, default: ''},
        "location": {type: String, default: ''},
        "timeZone": {type: String, default: ''},
        "utcOffset": {type: Number, default: ''},
        "geo":  {type: Object, default: {}},
        "logo": {type: String, default: ''},
        "facebook": {type: Object, default: {}},
        "linkedin":{type: Object, default: {}},
        "twitter": {type: Object, default: {}},
        "crunchbase": {type: Object, default: {}},
        "emailProvider": {type: Boolean},
        "type": {type: String, default: ''},
        "ticker": {type: String, default: ''},
        "phone": {type: String, default: ''},
        "indexedAt": {type: String, default: ''},
        "metrics": {type: Object, default: {}},
        "tech": {type: Array, default: []},
    }, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});


module.exports = mongoose.model('IncData', CompanySchema, 'CacheData');