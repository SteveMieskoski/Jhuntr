import template from './editor-top.component.html';
import controller from './editor-top.controller.js';

export const editorTopComponent = {
	require: {
		editorMain: '^^editorMain'
	},
	bindings: {
		showCropper: '&'
	},
	template,
	controller
};


 


