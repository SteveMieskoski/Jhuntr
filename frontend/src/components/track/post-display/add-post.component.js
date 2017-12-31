import template from "./add-post.component.html";
import controller from "./add-post.controller.js";



export const addPostModalComponent = {
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    },
    template,
    controller
};