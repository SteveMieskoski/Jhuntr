var renderHtml = require('./operation-controllers/render-html.js');
var renderHtmlToPdf = require('./operation-controllers/render-html-to-pdf.js');
var renderTex = require('./operation-controllers/tex.convert.js');
var generalConvert = require('./operation-controllers/general.convert.js');
var retrieveFile = require('./operation-controllers/retrieve-created');

module.exports = {
    renderhtml: renderHtml,
    renderHtmlToPdf: renderHtmlToPdf,
    renderTex: renderTex,
    generalConvert: generalConvert,
    retrieveCreated: retrieveFile
};

/*
module.exports.renderhtml = renderHtml;
module.exports.renderhtmlToPdf = renderHtmlToPdf;
module.exports.renderTex = renderTex;
module.exports.generalConvert = generalConvert;
*/
/*
module.exports.renderhtml = renderHtml;
    //renderHtml(resId, editable, style).then(function (results) {

//});


module.exports.renderhtmlToPdf = renderHtmlToPdf;
    //renderHtmlToPdf(resId, docUse, postingId).then(function (result) {

//});


module.exports.renderTex = function (req, res) {
    renderTex(req, res);
};

module.exports.generalConvert = function (req, res) {
    generalConvert(req, res);
};
*/
