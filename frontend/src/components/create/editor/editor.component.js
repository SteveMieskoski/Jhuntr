import template from'./editor.component.html';
import controller from './editor.controller.js';

export const editorComponent =  {
	bindings: {
		initData: '<',
		templateDetails: '<',
		postContent: '<'
	},
	template,
	controller
};

        

    
