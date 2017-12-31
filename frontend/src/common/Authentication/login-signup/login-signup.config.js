

loginSignupConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

export function loginSignupConfig($stateProvider, $urlRouterProvider) {


    var appStates = [ {
        name: 'login',
        url: '/login',
        component: 'authLogin'
    }, {
        name: 'signuproute',
        url: '/signup',
        component: 'authsignup'
    }];

    appStates.forEach(function (appState) {
        $stateProvider.state(appState);
    });

    $urlRouterProvider.otherwise('/');
}