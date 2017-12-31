import template from'./download-pdf.component.html';
import controller from './download-pdf.controller.js';

export const downloadPdfComponent = {
	bindings: {
		resolve: '<',
		close: '&',
		dismiss: '&'
	},
	template,
	controller
};
