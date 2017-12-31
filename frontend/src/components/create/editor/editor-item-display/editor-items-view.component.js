import template from './editor-items-view.component.html';
import controller from './editor-items-view.controller.js';

export const itemsViewComponent =  {
	bindings: {
		resolve: '<',
		close: '&',
		dismiss: '&'
	},
	template,
	controller
};


