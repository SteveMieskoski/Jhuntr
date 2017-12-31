CreatorConfig.$inject = ['$stateProvider', '$urlRouterProvider', 'storeProvider', '$httpProvider', '$provide', '$sceDelegateProvider', '$locationProvider'];

export function CreatorConfig($stateProvider, $urlRouterProvider, storeProvider, $httpProvider, $provide, $sceDelegateProvider, $locationProvider) {


    var appStates = [{
        name: 'reslist',
        url: '/resumes',
        component: 'createlist',
        resolve: {
            resumeList: ['CreatorDataFactory', function (CreatorDataFactory) {
                return CreatorDataFactory.getResList();
            }]
        }
    }, {
        name: 'rescreate',
        url: '/create?res?template',
        component: 'rescreator',
        resolve: {
            initData: ['CreatorDataFactory', '$stateParams', 'store', '$q', function (CreatorDataFactory, $stateParams, store, $q) {
                return CreatorDataFactory.getData($stateParams.res, true).then(function (response) {
                    return response;
                });
            }],
            templateDetails: ['CreatorDataFactory', '$stateParams', function (CreatorDataFactory, $stateParams) {
                return CreatorDataFactory.getTemplateDetails($stateParams.template).then(function (response) {
                    CreatorDataFactory.templateDetails = response.data;
                    return response.data;
                });
            }]
        }
    }];

    appStates.forEach(function (appState) {
        $stateProvider.state(appState);
    });

    $urlRouterProvider.otherwise('/');
}