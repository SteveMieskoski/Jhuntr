//export default runAuth;

runAuth.$inject = ['$rootScope', 'AuthService', 'authManager', '$transitions', 'store', '$state', '$location'];

export function runAuth($rootScope, AuthService, authManager, $transitions, store, $state, $location) {
    'ngInject';
    $rootScope.AuthService = AuthService;
    $rootScope.Authenticate = Authenticate;

        AuthService.authenticateAndGetProfile();
        authManager.checkAuthOnRefresh();




    $transitions.onBefore({to: ['gotocontent', 'main', 'user', 'doediting', 'rescreate', 'postlisting', 'editing', 'resselect', 'reslist', 'cloud']}, function (trans) {
        var auth_service = trans.injector().get('AuthService');
        auth_service.isLoggedIn().then(function (result) {
            return result;
        }).catch(function (err) {
            return $state.go('login');
        })
    });

    $transitions.onStart({to: ['*']}, function (trans) {
        var auth_service = trans.injector().get('AuthService');
    });

    $transitions.onStart({to: ['home']}, function (trans) {
        var newUser = store.get('newUser');
        //   if(newUser && $rootScope.isAuthenticated){
        //       $state.go('newuserhome')
        //   } else
        var revalidateLocation = store.get('revalidateLocation');
        if (revalidateLocation) {
            //   $location.path(revalidateLocation); //easier than using state at the moment (to quickly validate approach)
        } else if ($rootScope.isAuthenticated) {
            $state.go('userhome')
        }
    });


    $transitions.onError({to: ['*']}, function (trans) {
        console.log('routing error:', trans);
    });

    function Authenticate() {
        console.log('is auth:',AuthService.isAuthenticated());
        return AuthService.isAuthenticated();
    }

}
