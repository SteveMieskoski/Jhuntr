var Promise = require('bluebird');
var fs = require('fs');
var path = require('path');
var Handlebars = require('handlebars');
var _ = require('lodash');

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


var css = require('../../../../database').styleSchema;
var templatePath = require('../templates/templates-path-helper');

module.exports.prepare = function (rawDataObject, editable, style) {

	return new Promise(function (resolve, reject) {

		var i;
		var prop;
		var dataObject = rawDataObject[0];
		console.log('TEMPLATE PREP');

		var hasUserImage = dataObject.attachments ? dataObject.attachments.userImage : false;
		if (hasUserImage) {
			dataObject.attachments.userImage = "data:" + dataObject.attachments.img_contentType + ";base64," + dataObject.attachments.img_data.toString('base64');
		}

		render(dataObject, editable, style)
			.then(function (template) {
				console.log('partials redered ok');
				resolve(template);
			})
			.catch(function (err) {
				console.log('renderering error', err)
			});
	})
		.catch(function (err) {
			console.log('template prepare error', err)
		});
};


function render(contentData, editable, style) {
	return new Promise(function (resolve, reject) {
		console.log('RENDERER');
		var templateBasePath = templatePath.root('');
		Handlebars.registerHelper('partialsOrdering', function (object) {
			console.log('OBJECT', object);
			//    console.log('OBJECT SIDE', object['hash'].side);
			//      console.log('OBJECT SECTION', object['data'].root.design.ordering[object['hash'].side][object['hash'].rank]);
			console.log(object['data'].root.design.inner_templates[object['hash'].side][object['hash'].rank]);

			var thinkgs = object['data'].root.design.inner_templates[object['hash'].side][object['hash'].rank];
			// var styleChoice = object['data'].root.design[0].style
			//   console.log('thinkgs', thinkgs);
			if (thinkgs === undefined) {
				return "";
			}
			var sectionMatches = null;
			if (_.has(thinkgs, "_doc")) {
				sectionMatches = thinkgs._doc.section;
			} else if (_.has(thinkgs, "section")) {
				sectionMatches = thinkgs.section
			}
			//var sectionMatches = /sections\/([^.]+).html$/.exec(thinkgs._doc.section);
			if (!sectionMatches) {
				return "";
				//  reject(console.log('section template identification error'));
			}
			console.log('OBJECT NAME', sectionMatches);
			// console.log('OBJECT NAME', Object.getOwnPropertyNames(thinkgs) );
			//return sectionMatches[1];
			return sectionMatches;
		});

		var styleChoice = 'core_template';
		var backgroundChoice = contentData.design.style_options.background;
		// var backgroundChoice = 'bkgrnd.design.png';
		// var backgroundChoice = 'background-curve.svg';

		switch (styleChoice) {
			case 'core_template':

				var tpl = fs.readFileSync(templateBasePath + "/core.hbs", "utf-8");
				var partialsDir = path.join(templateBasePath, '/partials');
				break;
		}

		var filenames = fs.readdirSync(partialsDir);

		filenames.forEach(function (filename) {
			var matches = /^([^.]+).hbs$/.exec(filename);
			if (!matches) {
				return;
			}
			var name = matches[1];
			var filepath = path.join(partialsDir, filename);
			var template = fs.readFileSync(filepath, 'utf8');

			Handlebars.registerPartial(name, template);
		});

		/**  /*
		 * Retrieve css content from database
		 */
		var cssData = css.find({alt_id: '1'});

		cssData
			.exec()
			.then(function (result) {

				if (editable === false) {  //because some extraneous old code is still sending a string value as the second arg to prepare;
					console.log('should not run', editable);
					// contentData.cssData = result[0].core_template.replace(/#fakeElementForHtml/g,function(match){
					contentData.cssData = result[0][styleChoice].replace(/#fakeElementForHtml/g, function (match) {
						return ' html';
					});
					//contentData.backgroundImageCss = "background-image:url(" + templateBasePath + "/" + backgroundChoice + "); transform: scale(0.5, 0.5);";
					contentData.backgroundImageCss = "background-image:url(" + templateBasePath + "/backgrounds/" + backgroundChoice + "); background-size:cover; transform: scale(0.4, 0.4); background-repeat: no-repeat;";
				} else {
					contentData.cssData = result[0][styleChoice];
					contentData.backgroundImageCss = "background-image:url(" + templateBasePath + "/backgrounds/" + backgroundChoice + "); background-size:cover;";
				}

				resolve(Handlebars.compile(tpl, {compat: true})(contentData));
			})
			.catch(function (error) {
				console.log(error);
				reject(error);
			})
	})
};


function base64ArrayBuffer(arrayBuffer) {
	return new Promise(function (resolve, reject) {
		var base64 = ''
		var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

		var bytes = new Uint8Array(arrayBuffer)
		var byteLength = bytes.byteLength
		var byteRemainder = byteLength % 3
		var mainLength = byteLength - byteRemainder

		var a, b, c, d
		var chunk

		// Main loop deals with bytes in chunks of 3
		for (var i = 0; i < mainLength; i = i + 3) {
			// Combine the three bytes into a single integer
			chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]

			// Use bitmasks to extract 6-bit segments from the triplet
			a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
			b = (chunk & 258048) >> 12 // 258048   = (2^6 - 1) << 12
			c = (chunk & 4032) >> 6 // 4032     = (2^6 - 1) << 6
			d = chunk & 63               // 63       = 2^6 - 1

			// Convert the raw binary segments to the appropriate ASCII encoding
			base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
		}

		// Deal with the remaining bytes and padding
		if (byteRemainder == 1) {
			chunk = bytes[mainLength]

			a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2

			// Set the 4 least significant bits to zero
			b = (chunk & 3) << 4 // 3   = 2^2 - 1

			base64 += encodings[a] + encodings[b] + '=='
		} else if (byteRemainder == 2) {
			chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]

			a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
			b = (chunk & 1008) >> 4 // 1008  = (2^6 - 1) << 4

			// Set the 2 least significant bits to zero
			c = (chunk & 15) << 2 // 15    = 2^4 - 1

			base64 += encodings[a] + encodings[b] + encodings[c] + '='
		}

		resolve(base64);
	});
}