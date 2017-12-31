import template from "./status-label-change.component.html";
import controller from "./status-label-change.controller.js";



export const statusLabelChangeComponent = {
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    },
    template,
    controller
};