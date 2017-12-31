let SupportControllerInjectables = ['$rootScope'];


export default class SupportController {
    constructor($rootScope) {
        'ngInject';
        this.$rootScope = $rootScope;
    }

    $postLink() {
        this.$rootScope.$emit('navigationPageLoaded', 'support.controller');
    }

}


SupportController.$inject = SupportControllerInjectables;