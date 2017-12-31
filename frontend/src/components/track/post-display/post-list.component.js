import template from './post-list.component.html';
import controller from './post-list.controller.js';

export const postListComponent = {
    bindings: {
        taskListing: '<',
        postListUpdated: '&'
    },
    template,
    controller
};

