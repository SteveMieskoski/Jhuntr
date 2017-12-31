let UserHomeControllerInjectables = ['$rootScope', '$timeout', '$scope', 'UserHomeService'];

export default class UserHomeController {
    constructor($rootScope, $timeout, $scope, UserHomeService) {
        'ngInject';
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;
        this.$scope = $scope;
        this.service = UserHomeService;

        this.dataLoaded = false;

    }

    $onInit() {
        window.angular.element(this.pageLoaded());
    }


    $postLink() {
        this.$timeout(() => {
            if(this.dataLoadfinished){
                console.log('data load true');
                this.dataLoaded = true;
            }
         }, 750);
    }

    pageLoaded() {
        this.$rootScope.$emit('navigationPageLoaded', 'user-home.controller');
    }

}

UserHomeController.$inject = UserHomeControllerInjectables;