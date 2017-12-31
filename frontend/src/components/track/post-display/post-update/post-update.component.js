import template from "./post-update.component.html";
import controller from "./post-update.controller.js";

export const postUpdateModalComponent = {
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    },
    template,
    controller
};