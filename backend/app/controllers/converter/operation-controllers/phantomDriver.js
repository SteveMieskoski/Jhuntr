"use strict";

var page = require('webpage').create(),
    system = require('system'),
    address, output, size, pageWidth, pageHeight;

var footer =  {
    height: ".2cm",
        contents: phantom.callback(function () {
        return '' +
            '<div style="margin: 0 0 0 1cm; font-size: 0.65em; position: absolute; right: 0.5cm;">' +
            '   <div style="color: #888; padding: 0 0 0 0;">' +
                '  <span>Created at &nbsp;<img src="file:///home/ubuntu/production-backend/backend/controllers/converter/templates/drawing-medium.svg" height="10px">&nbsp; jhuntr.com </span>' +
            '   </div>' +
            '</div>';
        // '   <div style="color: #888; padding: 0 0 0 0; border-top: 1px solid #ccc;">' +
    })
};

if (system.args.length < 3 || system.args.length > 5) {
    console.log('Usage: rasterize.js URL filename [paperwidth*paperheight|paperformat] [zoom]');
    console.log('  paper (pdf output) examples: "5in*7.5in", "10cm*20cm", "A4", "Letter"');
    console.log('  image (png/jpg output) examples: "1920px" entire page, window width 1920px');
    console.log('                                   "800px*600px" window, clipped to 800x600');
    phantom.exit(1);
} else {
    address = system.args[1];
    output = system.args[2];
    console.log('sys arg 1', address);
    console.log('sys arg 1', output);
    page.viewportSize = {width: 850, height: 1100};
    if (system.args.length > 3 && system.args[2].substr(-4) === ".pdf") {
        size = system.args[3].split('*');
        page.paperSize = size.length === 2 ? {width: size[0], height: size[1], margin: '0px'}
          //  : {format: system.args[3], orientation: 'portrait', margin:  "0cm"};
         //   : {format: system.args[3], orientation: 'portrait', margin:  "0cm", footer: footer};
            : {format: system.args[3], orientation: 'portrait', margin: {bottom: "0.5cm"}, footer: footer};
        //  : { format: system.args[3], orientation: 'portrait', margin: '1cm' };
        //page.zoomFactor = 0.01;
        //page.dpi = 600;
        //page.pages = 1;

        page.settings.dpi = "96";
    }
    if (system.args.length > 4) {
        //page.zoomFactor = system.args[4];
        // page.zoomFactor = 0.01;
    }
    page.open(address, function (status) {
        console.log('page dpi', page.dpi);
        console.log('Phantom Version', phantom.version.major, '.', phantom.version.minor, '.', phantom.version.patch);
        //   console.log('paper size', page.paperSize);
        //   console.log('viewport size', page.viewportSize);
        if (status !== 'success') {
            console.log('Unable to load the address!');
            phantom.exit(100);
        } else {
            window.setTimeout(function () {
               // page.zoomFactor = 0.25;
                console.log('Page Rendering');
                page.render(output);
                phantom.exit();
            }, 500);
        }
    });
}

/*
 //FONT TESTING COMMAND LINE:
 phantomjs /media/sysadmin/DRV4_VOL1_2ndPt1/0Experiments/0MyContent_DRAG_AND_DROP_bkup1/backend/controllers/converter/phantomDriver.js /media/sysadmin/DRV4_VOL1_2ndPt1/0Experiments/jhuntr-alpha/backend/controllers/converter/fonts_available_test.html /media/sysadmin/DRV4_VOL1_2ndPt1/0Experiments/jhuntr-alpha/backend/controllers/converter/font_test.pdf
 */

//phantomjs phantomDriver.js '/media/sysadmin/DRV4_VOL1_2ndPt1/0Experiments/0MyContent_DRAG_AND_DROP_bkup1/backend/controllers/investigate.html' test.pdf