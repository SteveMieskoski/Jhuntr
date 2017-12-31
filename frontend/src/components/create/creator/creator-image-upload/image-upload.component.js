import template from './image-upload.component.html';
import controller from './image-upload.controller.js';

export const imageUploadComponent = {
	bindings: {
		resolve: '<',
		close: '&',
		dismiss: '&'
	},
	template,
	controller
};

