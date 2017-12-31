let HelpControllerInjectables = ['$rootScope'];

export default class HelpController {
    constructor($rootScope) {
        'ngInject';
        this.$rootScope = $rootScope;
    }

    $postLink() {
        this.$rootScope.$emit('navigationPageLoaded', 'help.controller');
    }
}

HelpController.$inject = HelpControllerInjectables;