import template from "./task-handler.component.html";
import controller from "./task-handler.controller.js";

export const TaskHandlerComponent = {
    bindings:{
      postData: '='
    },
    template,
    controller
};