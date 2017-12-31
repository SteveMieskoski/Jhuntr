import template from "./date-picker-modal.component.html";
import controller from "./date-picker-modal.controller.js";

export const datePickerModal = {
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    },
    template,
    controller
}
