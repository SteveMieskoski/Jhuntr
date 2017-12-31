import template from "./task-update.component.html";
import controller from "./task-update.controller.js";

export const TaskUpdateComponent = {
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    },
    template,
    controller
};