import template from './editor-styles-modal.component.html';
import controller from './editor-styles-modal.controller.js';

export const styleModalComponent = {
	bindings: {
		resolve: '<',
		close: '&',
		dismiss: '&'
	},
	template,
	controller
};


     

