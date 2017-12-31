

userHomeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

export function userHomeConfig($stateProvider, $urlRouterProvider) {


    var appStates = [{
        name: 'newuserhome',
        url: '/welcome',
        component: 'into'
    }, {
        name: 'userhome',
        url: '/home',
        component: 'userhome',
        resolve: {
        }
    },{
        name: 'fineuploaderpage',
        url: '/UploadResume',
        component: 'fineUploaderContainer'
    }];

    appStates.forEach(function (appState) {
        $stateProvider.state(appState);
    });

    $urlRouterProvider.otherwise('/');
}