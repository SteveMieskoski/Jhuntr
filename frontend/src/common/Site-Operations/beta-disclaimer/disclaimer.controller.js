let DisclaimerControllerInjectables = ['$rootScope'];

export default class DisclaimerController {
    constructor($rootScope) {
        'ngInject';
        this.$rootScope = $rootScope;
    }


    $postLink() {
        this.$rootScope.$emit('navigationPageLoaded', 'disclaimer.controller');
    }

}

DisclaimerController.$inject = DisclaimerControllerInjectables;