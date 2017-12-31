userHomeRun.$inject = ['$rootScope', '$transitions', 'store', '$animate', '$state'];

export function userHomeRun($rootScope, $transitions, store, $animate, $state) {
   'ngInject';
    $animate.enabled(true);

    $transitions.onStart({to: ['landing']}, function (trans) {
        var newUser = store.get('newUser');
        //   if(newUser && $rootScope.isAuthenticated){
        //       $state.go('newuserhome')
        //   } else
        if ($rootScope.isAuthenticated) {
            $state.go('userhome')
        }
    });

    /*
    // not displaying the userhome page after login.
    // useing to: ['landing'] creates an infinite loop.
    $transitions.onStart({to: ['userhome']}, function (trans) {
        var newUser = store.get('newUser');
        //   if(newUser && $rootScope.isAuthenticated){
        //       $state.go('newuserhome')
        //   } else
        if ($rootScope.isAuthenticated) {
            $state.go('userhome')
        } else {
            $state.go('landing')
        }
    }); */
}