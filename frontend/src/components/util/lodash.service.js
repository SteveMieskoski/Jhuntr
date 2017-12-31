let LodashFactoryInjectables = ['$window'];

export class LodashFactory {
    constructor($window) {
        'ngInject';
        this.$window = $window;
    }

    lodash() {
        if (!this.$window._) {
            // If lodash is not available you can now provide a
            // mock service, try to load it from somewhere else,
            // redirect the user to a dedicated error page, ...
        }
        return this.$window._;
    }
}

LodashFactory.$inject = LodashFactoryInjectables;

/*
 Reference: http://www.jvandemo.com/how-to-properly-integrate-non-angularjs-libraries-in-your-angularjs-application/
 */