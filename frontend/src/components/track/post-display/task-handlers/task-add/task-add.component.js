import template from "./task-add.component.html";
import controller from "./task-add.controller.js";

export const TaskAddComponent = {
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    },
    template,
    controller
};