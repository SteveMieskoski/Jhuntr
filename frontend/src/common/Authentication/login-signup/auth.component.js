import template from './auth.component.html';



export const authComponent = {
    template
};

AuthController.$inject = ['AuthService', '$timeout', '$http', '$log'];


function AuthController(AuthService, $timeout, $http, $log) {
    var vm = this;
    /*    vm.login = login;
     vm.signup = signup;
     vm.googleLogin = googleLogin;
     vm.githubLogin = githubLogin;
     vm.showSignupForm = showSignupForm;
     vm.SignUpTransition = SignUpTransition;
     vm.facebookLogin = facebookLogin;
     vm.loginForm = true;

     vm.$onInit = function(){
     window.loading_screen.finish();
     };

     function login() {
     vm.message = 'loading...';
     vm.loading = true;
     AuthService.login(vm.user, vm.pass, function (err) {
     if (err) {
     $log.info('login Error', err);
     vm.message = "something went wrong: " + err.message;
     vm.loading = false;
     }
     });
     };

     function showSignupForm(){
     vm.loginForm = !vm.loginForm;
     }

     function signup() {
     SignUpTransition();
     console.log('signup details', vm.userSignup, vm.userPass);
     vm.message = 'loading...';
     vm.loading = true;
     AuthService.signup(vm.userSignup, vm.userPass, function (err) {
     if (err) {
     $log.info('signup Error', err);
     vm.message = "something went wrong: " + err.message;
     vm.loading = false;
     vm.loginForm = !vm.loginForm;
     return alert('Something went wrong: ' + err.message);
     }
     console.log('no error', err);
     vm.loginForm = !vm.loginForm;
     vm.loading = false;
     });
     };

     function googleLogin() {
     vm.message = 'loading...';
     vm.loading = true;
     AuthService.googleLogin(function (err) {
     if (err) {
     $log.info('googleLogin Error', err);
     vm.message = "something went wrong: " + err.message;
     vm.loading = false;
     }
     });
     };

     function githubLogin() {
     vm.message = 'loading...';
     vm.loading = true;
     AuthService.githubLogin(function (err) {
     if (err) {
     $log.info('githubLogin Error', err);
     vm.message = "something went wrong: " + err.message;
     vm.loading = false;
     }
     });
     };

     function facebookLogin() {
     vm.message = 'loading...';
     vm.loading = true;
     AuthService.facebookLogin(function (err) {
     if (err) {
     $log.info('facebookLogin Error', err);
     vm.message = "something went wrong: " + err.message;
     vm.loading = false;
     }
     });
     };


     function SignUpTransition(){
     vm.signUpMessages = 'message 1';
     if(angular.element(document).find('body').hasClass('pg-loaded')) {
     console.log('transition 1');
     vm.uiViewStart = true;
     vm.transitionInnerContent = true;

     vm.jhloaded = false;
     vm.jhloading = true;

     vm.jhloadedInner = false;
     vm.jhloadingInner = true;
     beginTransExit();
     }
     }


     function beginTransExit(){
     $timeout(function(){
     console.log('transition 2');
     vm.uiViewStart = false;
     vm.jhloaded = true;
     vm.jhloadedInner = true;
     $timeout(function(){
     vm.transitionInnerContent = false;
     vm.jhloading = false;
     vm.jhloadingInner = false;
     //  vm.loading = false; // dev remove temp while checking
     // vm.loginForm = !vm.loginForm; // dev remove temp while checking
     console.log('transition 3');
     }, 500)
     }, 1000);

     }
     */
}


