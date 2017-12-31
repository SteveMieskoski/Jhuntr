import template from './tasks.component.html';
import controller from './tasks.controller.js';

export const tasksComponent = {
	bindings: {
		taskList: '=',
		taskClasses: '<'
	},
	transclude: {
		'completeIcon': 'taskCompleteBtn',
		'inCompleteIcon': 'taskIncompleteBtn',
		'editIcon': 'taskEditBtn',
		'deleteIcon': 'taskDeleteBtn',
		'updateIcon': 'taskUpdateBtn',
		'cancelIcon': 'taskUpdateCancelBtn'
	},
	template,
	controller
};


 


