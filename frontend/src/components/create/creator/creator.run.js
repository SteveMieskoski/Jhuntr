creatorRun.$inject = ['$rootScope', '$transitions', '$animate'];

export function creatorRun($rootScope, $transitions, $animate) {
    'ngInject';
    $rootScope.jhremoving = false;
    $animate.enabled(true);

    $transitions.onStart({to: ['*']}, function (trans) {
        $rootScope.$emit('launchTransition');
    });

}