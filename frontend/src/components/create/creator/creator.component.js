import template from './creator.component.html';
import controller from './creator.controller';

export const creatorComponent = {
            bindings: {
                initData: '<',
                templateDetails: '<'
            },
            template,
            controller
        };

