configFunc.$inject = ['$stateProvider', '$urlRouterProvider', 'storeProvider', '$httpProvider', '$provide', '$sceDelegateProvider', '$locationProvider'];

export function configFunc($stateProvider, $urlRouterProvider, storeProvider, $httpProvider, $provide, $sceDelegateProvider, $locationProvider) {
    'ngInject';
    /**
     * $provide.decorator below from http://stackoverflow.com/questions/21904174/two-views-in-one-angularui-router-state-sharing-scope
     */
    $provide.decorator('$rootScope', ['$delegate', function ($delegate) {
        Object.defineProperty($delegate.constructor.prototype, '$onRootScope', {
            value: function (name, listener) {
                var unsubscribe = $delegate.$on(name, listener);
                this.$on('$destroy', unsubscribe);
            },
            enumerable: false
        });
        return $delegate;
    }]);

    $locationProvider.html5Mode(false);
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://api.opencorporates.com/**',
        'http://api.opencorporates.com/**'
    ]);

    $httpProvider.cache = true;

    storeProvider.setStore('localStorage');

    var appStates = [
        {
            name: 'landing',
            url: '/',
            component: 'app'
        }, {
            name: 'gotocontent',
            url: '/content',
            component: 'mycontent'

        }, {
            name: 'blank',
            url: '/blank',
            component: 'dummy'
        }, {
            name: 'authland',
            // url: '/landing?access_token?expires',
            url: '/landing',
            component: 'authlanding'
        }
    ];


    appStates.forEach(function (appState) {
        $stateProvider.state(appState);
    });

    $urlRouterProvider.otherwise('/');


};
