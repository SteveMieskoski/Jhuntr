import template from './user-home.component.html';
import controller from './user-home.controller.js';

export const userHomeComponent = {
	bindings: {
		taskListing: '<'
	},
	template,
	controller
};

