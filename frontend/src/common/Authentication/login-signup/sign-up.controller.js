let AuthLoginControllerInjectAbles = ['AuthService', '$timeout', 'store', '$state', '$rootScope'];

export default class AuthLoginController {
    constructor(AuthService, $timeout, store, $state, $rootScope) {
        'ngInject';
        this.AuthService = AuthService;
        this.$timeout = $timeout;
        this.store = store;
        this.$state = $state;
        this.$rootScope = $rootScope;

        this.loginForm = true;
        window.angular.element(this. pageLoadComplete());
    }


    $onInit() {
       // window.angular.element(this. pageLoadComplete());
    };

    pageLoadComplete(){
        this.$rootScope.$emit('navigationPageLoaded', 'sign-up.controller');
      //  window.loading_screen.finish();
      //  console.log('page Loaded -> AuthLoginController (AKA SignupController)');
    }

    login() {
        this.message = 'loading...';
        this.loading = true;
        this.AuthService.login(this.user, this.pass)
            .then(() => {})
            .catch((err) => {
                this.message = "something went wrong: " + err.message;
                this.loading = false;
                return alert(this.message);
            })
    };

    showSignupForm() {
        this.loginForm = !this.loginForm;
    }

    signup() {
        this.SignUpTransition();
        this.message = 'loading...';
        this.loading = true;
        this.AuthService.signup(this.user, this.pass)
            .then(() => {
                this.loginForm = !this.loginForm;
                this.loading = false;
                this.store.set('newUser', true);
            })
            .catch( (err) => {
                if (err) {
                    this.message = "something went wrong: " + err.message;
                    this.loading = false;
                    this.loginForm = !this.loginForm;
                    return alert(this.message);
                }
            })
    };

    googleLogin() {
        this.message = 'loading...';
        this.loading = true;
        this.AuthService.googleLogin()
            .then(() => {})
            .catch((err) => {
                if (err) {
                    this.message = "something went wrong: " + err.message;
                    this.loading = false;
                    return alert(this.message);

                }
            });
    };

    githubLogin() {
        this.message = 'loading...';
        this.loading = true;
        this.AuthService.githubLogin()
            .then(() => {})
            .catch((err) => {
                if (err) {
                    this.message = "something went wrong: " + err.message;
                    this.loading = false;
                    return alert(this.message);
                }
            });
    };

    facebookLogin() {
        this.message = 'loading...';
        this.loading = true;
        this.AuthService.facebookLogin()
            .then(() => {})
            .catch((err) => {
                if (err) {
                    this.message = "something went wrong: " + err.message;
                    this.loading = false;
                    return alert(this.message);
                }
            });
    };

    SignUpTransition() {
        this.signUpMessages = 'message 1';
        //note (angular.element(document).find('body').hasClass('pg-loaded'))
        if (document.querySelector('body.pg-loaded')) {
            this.uiViewStart = true;
            this.transitionInnerContent = true;
            this.jhloaded = false;
            this.jhloading = true;
            this.jhloadedInner = false;
            this.jhloadingInner = true;
            this.beginTransExit();
        }
    }

    beginTransExit() {
        this.$timeout( () => {
            this.uiViewStart = false;
            this.jhloaded = true;
            this.jhloadedInner = true;
            this.$timeout( () => {
                this.transitionInnerContent = false;
                this.jhloading = false;
                this.jhloadingInner = false;
            }, 500)
        }, 1000);
    }

}

AuthLoginController.$inject = AuthLoginControllerInjectAbles;