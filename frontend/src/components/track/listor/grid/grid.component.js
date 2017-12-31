import template from './grid.component.html';
import controller from './grid.controller.js';

export const GridComponent = {
    bindings: {
        postListing: '<',
        //  taskListing: '<',
        //  reminderListing: '<'
    },
    template,
    controller
};



