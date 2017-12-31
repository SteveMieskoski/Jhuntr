import template from "./post-details.component.html";
import controller from "./post-details.controller.js";

export const postDetailsModalComponent = {
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    },
    template,
    controller
};