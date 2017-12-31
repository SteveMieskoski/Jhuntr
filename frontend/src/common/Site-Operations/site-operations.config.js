

SiteOperationsConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

export function SiteOperationsConfig($stateProvider, $urlRouterProvider) {


    var appStates = [{
        name: 'supportroute',
        url: '/support',
        component: 'support'
    }, {
        name: 'issuesroute',
        url: '/support/contact',
        component: 'issues'
    }, {
        name: 'helproute',
        url: '/Documentation',
        component: 'help'
    }, {
        name: 'disclaimroute',
        url: '/BetaNotice',
        component: 'disclaimer'
    }];

    appStates.forEach(function (appState) {
        $stateProvider.state(appState);
    });

    $urlRouterProvider.otherwise('/');
}