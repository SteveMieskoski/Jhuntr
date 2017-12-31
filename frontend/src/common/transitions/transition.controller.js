let TransitionControllerInjectables = ['$http'];

export default class TransitionController {
    constructor($http) {
        'ngInject';
        this.$http = $http;

        this.loadingMessage = "New Message";
        //this.loading = this.$http.pendingRequests;
    }

}

TransitionController.$inject = TransitionControllerInjectables;