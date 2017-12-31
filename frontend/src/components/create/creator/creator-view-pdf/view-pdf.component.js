

import template from './view-pdf.component.html';
import controller from './view-pdf.controller.js';


export const viewPdfComponent = {
	bindings: {
		resolve: '<',
		close: '&',
		dismiss: '&'
	},
	template,
	controller
};


