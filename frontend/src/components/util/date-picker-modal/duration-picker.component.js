import template from "./duration-picker.component.html";
import controller from "./duration-picker.controller.js";

export const durationPickerComponent = {
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    },
    template,
    controller
}
