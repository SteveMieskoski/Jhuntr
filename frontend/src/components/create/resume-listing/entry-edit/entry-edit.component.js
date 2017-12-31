import template from "./entry-edit.component.html"
import controller from "./entry-edit.controller.js"

export const EntryEditComponent = {
    bindings:{
        resId: '<',
        editData: '<',
        editIndex: '<',
        returnData: '&'
    },
	template,
	controller
};

