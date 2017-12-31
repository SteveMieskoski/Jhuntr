import controller from './creator-input.controller.js';


export const creatorInputComponent = {
	bindings: {
		inputSelection: '@',
		existingData: '='
	},
	templateUrl: ['rootPath', '$element', '$attrs', (rootPath, $element, $attrs) => {
        "ngInject";
		let template = rootPath + '/creator-details-edit/inputTemplates/' + $attrs.inputSelection + '.form.html';
        //let template = $attrs.inputSelection + '.form.html';
        return template;
    }],
	controller
};



