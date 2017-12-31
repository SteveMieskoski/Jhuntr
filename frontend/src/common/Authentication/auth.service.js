let AuthServiceInjectables = ['auth0Interface', 'host', '$timeout', '$http', '$log', '$q', 'store', '$rootScope', '$location', 'authConsts', 'IdentityService'];

export class AuthService {
    constructor(auth0Interface, host, $timeout, $http, $log, $q, store, $rootScope, $location, authConsts, IdentityService) {
        this.auth0Interface = auth0Interface;
        this.$timeout = $timeout;
        // this.$http = $http;
        this.$log = $log;
        this.$q = $q;
        this.store = store;
        this.$rootScope = $rootScope;
        this.$location = $location;
        this.authConsts = authConsts;
        this.host = host.host;
        this.IdentityService = IdentityService;
    }

    authenticateAndGetProfile() {
        return this.auth0Interface.authenticateAndGetProfile();
    }

    isAuthenticated() {
        return this.auth0Interface.isAuthenticated();
    }

    isLoggedIn() {
        return this.auth0Interface.isLoggedIn();
    }

    login(user, pass) {
        return this.$q((resolve, reject) => {
            this.auth0Interface.login(user, pass, (err) => {
                if (err) {
                    this.$log.info('login Error', err);
                    reject(err);
                }
                resolve(true);
            });
        });

    };

    logout() {
        this.auth0Interface.logout();
        this.store.remove('userID');
        this.store.remove('newUser');
        this.store.remove('lastEdited');
        this.$rootScope.isAuthenticated = false;
        this.$location.path('/');
    }

    showSignupForm() {
        this.loginForm = !this.loginForm;
    }

    signup(userSignup, userPass) {
        return this.$q((resolve, reject) => {
            this.auth0Interface.signup(userSignup, userPass)
                .then((response) => {
                    //  resolve(true);
                    console.log('signup error response', response);
                    signupError(response)
                })
                .catch((err) => {
                    this.$log.info('signup Error', err);
                    reject(err);
                });


            function signupError(error) {
                console.log('signup error', error);
            }
        });
    };

    googleLogin() {
        return this.$q((resolve, reject) => {
            this.auth0Interface.googleLogin((err) => {
                if (err) {
                    this.$log.info('googleLogin Error', err);
                    reject(err);
                }
                resolve(true);
            });
        });

    };

    githubLogin() {
        return this.$q((resolve, reject) => {
            this.auth0Interface.githubLogin((err) => {
                if (err) {
                    this.$log.info('githubLogin Error', err);
                    reject(err);
                }
                resolve(true);
            });
        });

    };

    facebookLogin() {
        return this.$q((resolve, reject) => {
            this.auth0Interface.facebookLogin((err) => {
                if (err) {
                    this.$log.info('facebookLogin Error', err);
                    reject(err);
                }
                resolve(true);
            });
        });

    };
}

AuthService.$inject = AuthServiceInjectables;
