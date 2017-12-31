

run.$inject = ['$rootScope', '$transitions', '$animate', '$timeout', '$location'];

export function run($rootScope, $transitions, $animate, $timeout, $location) {
    'ngInject';
    $rootScope.jhremoving = false;
    $animate.enabled(true);

    $transitions.onBefore({to:['*']}, function (trans) {
       // $rootScope.$emit('launchTransition');
        console.log('root.run: ',$location.hash());
        console.log(trans);
    });


    function load() {
        window.loading_screen.finish();
        console.log("Page load event detected! | root.run.js");
    }

    window.onload = load;  //triggered on initial page load and on reload after login
    /*
    $timeout(() => {
        window.loading_screen.updateLoadingHtml('<div class="sk-wave"> <div class="sk-rect sk-rect1"></div> <div class="sk-rect sk-rect2"></div> <div class="sk-rect sk-rect3"></div> <div class="sk-rect sk-rect4"></div> <div class="sk-rect sk-rect5"></div> </div><p class="pg-loading-html">Getting Ready!</p>')
        }, 500);


    let splash = document.querySelector('div#transition-container');
    //let splash = window.angular.element(document).find('transition').hasClass('.jh-loading-screen');

    console.log(splash);
    splash.ontransitionrun = function(event){
        console.log('On Transition Run');
    };

    splash.ontransitionend = function(event){
        console.log('On Transition End');
    };
    */

}
