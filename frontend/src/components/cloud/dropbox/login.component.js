import template from "./login.component.html";

let DropboxLoginControllerInjectables = ['$rootScope', 'DropboxService', 'store', '$http'];

class DropboxLoginController{
    constructor($rootScope, DropboxService, store, $http) {
        this._$rootScope = $rootScope;
        this._DropboxService = DropboxService;
        this._store = store;
        this.http = $http;
    }

    $onInit() {
        window.angular.element(this.loadComplete());
        let drop_token = this._store.get('dropbox');

        if (drop_token && drop_token !== 'get_access') {
        } else {
            this.authorizeLink =  this._DropboxService.ifNotAuthenticated();
        }
    }

    loadComplete() {
        this._$rootScope.$emit('navigationPageLoaded', 'DropboxController');
    }

    beginAuth() {
        this._store.set('dropbox', 'get_access');
    }

}

DropboxLoginController.$inject = DropboxLoginControllerInjectables;

export const DropboxLoginComponent = {
    template,
    controller: DropboxLoginController
};