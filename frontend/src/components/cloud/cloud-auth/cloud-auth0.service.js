let CloudAuth0Injectables = ['angularAuth0', 'authManager', '$location', '$cookies', '$cookieStore', 'store', '$rootScope', 'jwtHelper', '$q', 'AccountDataFactory', '$log'];


export class CloudAuth0{
    constructor(angularAuth0, authManager, $location, $cookies, $cookieStore, store, $rootScope, jwtHelper, $q, AccountDataFactory, $log) {
        'ngInject';
        this.$rootScope = $rootScope;
        this.angularAuth0 = angularAuth0;
        this.authManager = authManager;
        this.$location = $location;
        this.$cookies = $cookies;
        this.$cookieStore = $cookieStore;
        this.store = store;
        this.jwtHelper = jwtHelper;
        this.$q = $q;
        this.service = AccountDataFactory;
        this.$log = $log;

        this.auth0 = new Auth0({
            domain: 'thatn3wguy.auth0.com',
            clientID: 'Chw9E1k6a8jiZFeV8zDKSVpk2haGRP3b',
            callbackURL: 'localhost:9000/*',
            responseType: 'token'
        });
    }

    // associateCloudAccount(user_id, userId, token)

    isAuthenticated() {
        if (!this.$rootScope.isAuthenticated) {
            let token = window.localStorage.getItem('id_token');
            if (token) {
                if (!this.jwtHelper.isTokenExpired(token)) {
                    this.$rootScope.isAuthenticated = true;
                    return true;
                } else if (this.jwtHelper.isTokenExpired(token)) {
                    this.$rootScope.isAuthenticated = false;
                    this.logout();
                    return false;
                } else {
                    this.$rootScope.isAuthenticated = false;
                    return false;
                }
            }
            this.$rootScope.isAuthenticated = false;
            return false;
        }
    }



    isLoggedIn() {
        return this.$q( (resolve, reject)  => {
            if (!this.$rootScope.isAuthenticated) {
                let token = window.localStorage.getItem('id_token');
                if (token) {
                    if (!this.jwtHelper.isTokenExpired(token)) {
                        this.$rootScope.isAuthenticated = true;
                        resolve(true);
                    } else if (this.jwtHelper.isTokenExpired(token)) {
                        this.$rootScope.isAuthenticated = false;
                        this.logout();
                        reject(false);
                    } else {
                        this.$rootScope.isAuthenticated = false;
                        reject(false);
                    }
                }
                this.$rootScope.isAuthenticated = false;
                reject(false);
            }
        });

    }


    googleLogin(callback) {
        this.angularAuth0.login({
            connection: 'google-oauth2',
            responseType: 'token'
        }, callback);
    }

    dropboxLogin(callback) {
        this.angularAuth0.login({
            connection: 'dropbox',
            responseType: 'token'
        }, callback);
    }


    logout() {
        this.store.remove('id_token');
        this.store.remove('profile');
        this.store.remove('dropbox');
        this.$cookies.remove('id_token');
        this.authManager.unauthenticate();
    }

    authenticateAndGetProfile() {
        return this.$q((resolve, reject) => {
            let result = this.angularAuth0.parseHash(window.location.hash);
            console.log('ANGULAR AUTH0 PARSE HASH RESULT: ', result);
            if (result && result.idToken) {

                this.store.set('cloud_token', result.idToken);

                //   this.authManager.authenticate();
                //   this.$rootScope.isAuthenticated = true;

                this.angularAuth0.getProfile(result.idToken,  (error, profileData) => {
                    var associate;
                    if (error) {
                        this.$log.info('authenticateAndGetProfile Error', error);
                        // this.$location.path('/login');
                        reject(error);
                        console.log(error);
                    }
                    this.store.set('cloud_profile', profileData);

                    let userId = this.store.get('userID');
                    if(profileData.user_metadata){
                        if(profileData.user_metadata.userId){
                            if(profileData.user_metadata === userId){
                               // alert('local and remote userId\'s match');
                                console.log("local and remote userId's match")
                            }
                            associate = false;
                        } else {
                            associate = true;
                        }

                    } else {
                         associate = true;
                    }

                    if(associate){
                        this.service.associateCloudAccount(profileData.user_id, userId, result.idToken)
                            .then((response) =>{

                                //this.$cookieStore.put('cloud_token', result.idToken);
                                resolve(result);
                            })
                            .catch((error) => {
                                console.log('ERROR, CloudAuth0Service:authenticateAndGetProfile', error);
                                reject(error);
                            })
                    }



                });
            } else if (result && result.error) {
                //this.$location.path('/login');
                alert('error: ' + result.error);
                reject(result.error);
            }
        })

    }



    getCloudService() {

    }


}

CloudAuth0.$inject = CloudAuth0Injectables;





/*
 // auth0|591fbd62d4e199438b37e56f
 let result = profileData.user_id.match(/(^.*)\|/i)[1];
 console.log(result);
 if(!result){
 result = profileData.identities[0].provider;
 }
 */