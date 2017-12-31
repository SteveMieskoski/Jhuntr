'use strict';

export function targetWindow () {
    return {
        controller: ['$element', function ($element) {
            this.$element = $element;
        }]
    };
};