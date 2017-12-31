import template from './editor-right.component.html';
import controller from './editor-right.controller.js';

export const editorRightComponent = {
	require: {
		editorMain: '^^editorMain'
	},
	bindings: {
		postContent: '<'
	},
	template,
	controller
};

