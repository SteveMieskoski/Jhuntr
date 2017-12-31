/**
 * Service wrapper for gapi auth functions
 */
//  '$mdDialog',
let GapiServiceInjectables = ['$q', 'googleApi', 'gConstants', '$uibModal'];

export class GapiService {
    constructor($q, googleApi, gConstants, $uibModal) {
        this.$q = $q;
        this.googleApi = googleApi;
        this.gConstants = gConstants;
        this.$uibModal = $uibModal;

    }

    isTokenValid() {
        var token = gapi.auth.getToken();
        return (token && Date.now() < token.expires_at);
    };


    buildAuthRequest(immediateMode, user) {
        var request = {
            client_id: this.gConstants.clientId,
            scope: this.gConstants.scopes.drive[0],
            immediate: immediateMode
        };
        if (user) {
            request.login_hint = user;
            request.authuser = -1;
        }
        return request;
    };


    executeRequest(request) {
        return this.googleApi.then( (gapi) => {
            if (this.isTokenValid()) {
                return gapi.auth.getToken();
            } else {
                var deferred = this.$q.defer();
                gapi.auth.authorize(request, (result) => {
                    if (result && !result.error) {
                        deferred.resolve(result);
                    } else {
                        var error = result ? result.error : 'Unknown authentication error';
                        deferred.reject(error);
                    }
                });
                return deferred.promise;
            }
        });
    };


    login(user) {
        var request = this.buildAuthRequest(false, user);
        return this.executeRequest(request);
    };


    checkAuth(user) {
        var request = this.buildAuthRequest(true, user);
        return this.executeRequest(request);
    };

}

GapiService.$inject = GapiServiceInjectables;

/*
 angular.module('editor.login').service('login', ['$q', '$mdDialog', 'googleApi', 'clientId', 'scope', function ($q, $mdDialog, googleApi, clientId, scope) {


 }]);

 */