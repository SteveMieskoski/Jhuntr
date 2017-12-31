import controller from "./company-lookup.controller.js";
import template from "./company-lookup.component.html";

export const companyLookup = {
    bindings: {
        name: '=',
        location: '=',
        companySelected: '&',
        resolve: '<',
        close: '&',
        dismiss: '&'
    },
    template,
    controller
};