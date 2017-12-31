import template from "./picker-modal.component.html";
import controller from "./picker-modal.controller.js";

export const PickerModalComponent = {
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    },
    template,
    controller
}
