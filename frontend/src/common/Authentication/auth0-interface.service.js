let auth0InterfaceInjectables = ['angularAuth0', 'authManager', '$location', '$cookies', '$cookieStore', 'store', '$rootScope', 'jwtHelper', '$q', 'IdentityService', '$log'];


export class auth0Interface{
    constructor(angularAuth0, authManager, $location, $cookies, $cookieStore, store, $rootScope, jwtHelper, $q, IdentityService, $log) {
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
        this.IdentityService = IdentityService;
        this.$log = $log;

        this.auth0 = new Auth0({
            domain: 'thatn3wguy.auth0.com',
            clientID: 'Chw9E1k6a8jiZFeV8zDKSVpk2haGRP3b',
            callbackURL: 'localhost:9000/*',
            responseType: 'token'
        });
    }

    isAuthenticated() {
        if (!this.$rootScope.isAuthenticated) {
            let token = localStorage.getItem('id_token');
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
                let token = localStorage.getItem('id_token');
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

    login(username, password, callback) {
        this.angularAuth0.login({
            connection: 'Username-Password-Authentication',
            responseType: 'token',
            email: username,
            password: password
        }, callback);
    }



    signup(email, password) {
        return this.$q((resolve, reject) => {
            this.angularAuth0.signup({
                connection: 'Username-Password-Authentication',
                responseType: 'token',
                email: email,
                password: password
            }, resolve);
        })
    }

    googleLogin(callback) {
        this.angularAuth0.login({
            connection: 'google-oauth2',
            responseType: 'token'
        }, callback);
    }

    githubLogin(callback) {
        this.angularAuth0.login({
            connection: 'github',
            responseType: 'token'
        }, callback);
    }

    facebookLogin(callback) {
        this.angularAuth0.login({
            connection: 'facebook',
            responseType: 'token'
        }, callback);
    }

    logout() {
        this.store.remove('id_token');
        this.store.remove('profile');
        this.store.remove('dropbox');
        this.$cookies.remove('id_token');
        this.store.remove('cloud_token');
        this.store.remove('cloud_profile');
        this.authManager.unauthenticate();
    }

    authenticateAndGetProfile() {
        let result = this.angularAuth0.parseHash(window.location.hash);

        if (result && result.idToken) {
            this.store.set('id_token', result.idToken);
            this.$cookieStore.put('id_token', result.idToken);
            this.authManager.authenticate();
            this.$rootScope.isAuthenticated = true;

           this.angularAuth0.getProfile(result.idToken,  (error, profileData) => {
                if (error) {
                    this.$log.info('authenticateAndGetProfile Error', error);
                    this.$location.path('/login');
                    console.log(error);
                }
                this.store.set('profile', JSON.stringify(profileData));

                this.IdentityService.userDataCheck(profileData)
                    .then( (response) => {
                        if(response === 'userCreated'){
                          this.$rootScope.$emit('updateStatues');
                        }
                        console.log('get user profile Response', response);
                       // anything to do or check?
                    });
            });
        } else if (result && result.error) {
            this.$location.path('/login');
            alert('error: ' + result.error);
        }
    }

    getAuthProfile() {
        return this.$q( (resolve, reject) => {
            if (!this.$rootScope.isAuthenticated) {
                let token = localStorage.getItem('id_token');
                if (token) {
                    this.angularAuth0.getProfile(token,  (error, profileData) => {
                        if (error) {
                            this.$log.info('getAuthProfile Error', error);
                            console.log(error);
                            reject(false);
                        }
                        console.log('Profile stored from route activation');
                        this.store.set('profile', JSON.stringify(profileData));
                        resolve(true);
                    });
                }
            }
        })
    }


}

auth0Interface.$inject = auth0InterfaceInjectables;