import template from './listor-empty.component.html';
import controller from './listor-empty.controller.js';

export const ListorEmptyComponent = {
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    },
	template,
	controller
};





