import template from './post-display.component.html';
import controller from './post-display.controller.js';

export const postDisplayComponent = {
	bindings: {
		postArray: '<'
	},
	template,
	controller
};

