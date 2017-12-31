TrackConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

export function TrackConfig($stateProvider, $urlRouterProvider) {


    var appStates = [{
        name: 'postlisting',
        url: '/targets',
        component: 'listorList',
        resolve: {
            postListing: ['ListorDataFactory', function (ListorDataFactory) {
                "ngInject";
                return ListorDataFactory.listPosts({
                    created_at: 1,
                    resume_label: 1,
                    tasks: 1,
                    company_address: 1,
                    contactLabel: 1,
                    contactDetail: 1,
                    dateApplied: 1,
                    source: 1,
                    location: 1,
                    city: 1,
                    state: 1,
                    logo: 1,
                    lat: 1,
                    long: 1
                });
            }]
        }
    },  {
        name: 'taskscomplete',
        url: '/allTasks',
        component: 'tasksComplete',
        resolve: {
            allPostsListing: ['ListorDataFactory', function (ListorDataFactory) {
                "ngInject";
                return ListorDataFactory.listPosts({created_at: 1, resume_label: 1, tasks: 1});
            }]
        }
    }, {
        name: 'postcomplete',
        url: '/target?status?entry',
        component: 'postComplete',
        resolve: {
            allData: ['ListorDataFactory', '$stateParams', function (ListorDataFactory, $stateParams) {
                "ngInject";
                return ListorDataFactory.getPost($stateParams.entry);
            }]
        }
    }];

    appStates.forEach(function (appState) {
        $stateProvider.state(appState);
    });

    $urlRouterProvider.otherwise('/');
}