import controller from "./item-upload.controller.js";
import template from "./item-upload.component.html";

//import '../../../../node_modules/fine-uploader/fine-uploader-gallery.css';
//import '../../../../node_modules/fine-uploader/templates/gallery.html';
//import '../../../../node_modules/fine-uploader/loading.gif';
//import '../../../../node_modules/fine-uploader/processing.gif';


export const itemUploadComponent = {
	bindings: {
		uploadServer: '<',
		notAvailablePlaceholder: '<',
		waitingPlaceholder: '<',
		maxFileSize: '<',
		largePreviewSize: '<',
		allowedMimes: '<',
		allowedExtensions: '<'
	},
	//interpolate: true,
	controller,
	template
};