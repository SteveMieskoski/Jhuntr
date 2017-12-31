import template from "./editor-import-core.component.html";
import controller from "./editor-import-core.controller.js";

export const importCoreComponent = {
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    },
    template,
    controller
};

