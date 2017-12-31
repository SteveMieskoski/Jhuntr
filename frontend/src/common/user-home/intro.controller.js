let IntroControllerInjectables = ['$rootScope', '$timeout'];

export default class IntroController {

    constructor($rootScope, $timeout){
        'ngInject';
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;
    }
    $postLink() {
        this.$timeout(() => {
            this.$rootScope.$emit('navigationPageLoaded', 'intro.controller');
        }, 750);
    };
}

IntroController.$inject = IntroControllerInjectables;