/**
 *  container that diplays/displayed the details-edit templates
 */

import template from "./creator-styles-input.html";
import controller from './creator-form.controller.js';

export const creatorFormComponent = {
	require: {
		creator: '^^rescreator'
	},
	bindings: {
		inputTemplate: '<',
		inData: '=',
		outData: '&'
	},
    template,
	controller
};


