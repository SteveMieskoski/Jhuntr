let CloudAuthServiceInjectables = ['store', '$q', '$rootScope', 'CloudAuth0'];

export class CloudAuthService {
    constructor(store, $q, $rootScope, CloudAuth0) {
        this.store = store;
        this.gapi = window.gapi;
        this.$rootScope = $rootScope;
        this.CloudAuth0 = CloudAuth0;
        this._q = $q;
    }



    authorize(){

    }

    googleLogin() {
        this.store.set('cloudAuth', true);
            this.CloudAuth0.googleLogin((err) => {
                if (err) {
                    console.log('googleLogin Error', err);
                    this.$rootScope.authorizingCloud = false;
                    reject(err);
                }
                this.$rootScope.authorizingCloud = false;
            });

    };

    dropboxLogin() {
        this.store.set('cloudAuth', true);
            this.CloudAuth0.dropboxLogin((err) => {
                if (err) {
                    console.log('googleLogin Error', err);
                    this.$rootScope.authorizingCloud = false;
                    reject(err);
                }
                this.$rootScope.authorizingCloud = false;
        });

    };

    demo(){

    }
}

CloudAuthService.$inject = CloudAuthServiceInjectables;