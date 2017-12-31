var Promise = require('bluebird');


var resModels = require('../../../../database').resSchema;

//var winston = require('../../../logger');
//var logger = winston.default;

var dataPrep = require('./template-data-prep');

module.exports = function (resId, editable, style) {
	console.log('render-html'); // todo remove debug item
    return new Promise(function (resolve, reject) {
      //  logger.info(resId);
        resModels.resume.find({_id: resId})
            .populate('basics location profiles employment volunteer education awards publications skills languages interests references affiliations examples governance labels design attachments strengths courses projects technologies highlights')
            .exec().then(function (info) {

            if (!info) {
              //  logger.silly('No Date Retrieved');
                reject('no resume located to render');
            }
            return dataPrep.prepare(info, editable, style).then(function (html) {

                resolve(html);
            }).catch(
                function (err) {
               //     logger.error('resume.controller.retrieveToEdit: process data prepare/create template error', err);
                    reject(err);
                }
            );
        }).catch(function (err) {
           // logger.error('resume.controller.retrieveToEdit: retrieve error', err);
            reject(err);
        });
    })
};