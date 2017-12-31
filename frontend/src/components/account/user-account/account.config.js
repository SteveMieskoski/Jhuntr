UserAccountConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

export function UserAccountConfig($stateProvider, $urlRouterProvider) {

    var appStates = [{
        name: 'user',
        url: '/user',
        component: 'useraccount'
    }];

    appStates.forEach(function (appState) {
        $stateProvider.state(appState);
    });

    $urlRouterProvider.otherwise('/');
}