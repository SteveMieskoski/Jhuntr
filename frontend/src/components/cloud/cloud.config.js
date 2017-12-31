CloudConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$sceDelegateProvider'];

export function CloudConfig($stateProvider, $urlRouterProvider, $sceDelegateProvider) {


    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://api.dropboxapi.com/**'
    ]);

    var appStates = [{
        name: 'cloud',
        url: '/cloud',
        component: 'cloudcomponent',
    }, {
        name: 'drive',
        url: '/GoogleDrive',
        component: 'gdrive'
    }, {
        name: 'dropbox',
        url: '/Dropbox',
        component: 'dropbox',
        resolve: {
            resumeList: ['CreatorDataFactory', function (CreatorDataFactory) {
                return CreatorDataFactory.getResList();
            }]
        }
    }];

    appStates.forEach(function (appState) {
        $stateProvider.state(appState);
    });

    $urlRouterProvider.otherwise('/');
}