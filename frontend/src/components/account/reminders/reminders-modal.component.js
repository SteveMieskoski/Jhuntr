import template from './reminders-modal.component.html';
import controller from './reminders-modal.controller.js';

export const remindersModalComponent =  {
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    },
    template,
    controller
};


