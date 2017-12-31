let RootControllerInjectables = ['$scope', '$rootScope', '$transitions', '$location', '$timeout', '$q', '$http', 'DropboxService', 'store'];

export class RootController {
    constructor($scope, $rootScope, $transitions, $location, $timeout, $q, $http, DropboxService, store) {
        'ngInject';
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$transitions = $transitions;
        this.$location = $location;
        this.$timeout = $timeout;
        this.$q = $q;
        this.$http = $http;
        this.DropboxService = DropboxService;
        this.store = store;

        this.jhremoving = false;
        this.jhremovingInner = false;
        this.loading = this.$http.pendingRequests;
        console.log(this.loading);
       /* let axc_token = this.$location.hash();
        if(this.store.get('dropbox') === 'get_access'){
            this.DropboxService.parseAccessTokenFromUrl(axc_token);
        }*/
        this.$scope.$on('$viewContentLoaded', (event, data) => {
            let dataString = data ? data : '';
            // console.log(event);
            //	console.log('view content loaded: %s', dataString, Date.now());
            // note !angular.element(document).find('body').hasClass('pg-loaded')
            if (!document.querySelector('body.pg-loaded')) {
                //     window.loading_screen.finish();
            }
        });

        this.$rootScope.$on('navigationPageLoaded', (event, data) => {
            let dataString = data ? data : '';
            console.log('navigation page loaded: signaled from ', data);

            //  console.log('navigation page loaded %s', dataString, Date.now());
            // note !angular.element(document).find('body').hasClass('pg-loaded')
            //if (!document.querySelector('body.pg-loaded')) {
            this.loading = this.$http.pendingRequests;
            console.log(this.loading);
            // if (this.loading.length === 0) {
            //       window.loading_screen.finish();
            // this.beginTransExit()
            //   }
            this.$timeout(() => {
                if (window.angular.element(document).find('body').hasClass('pg-loaded')) {
                    /* this.$timeout(() => {
                     window.loading_screen.finish();
                     */
                    this.beginTransExit()

                    //  this.$scope.currentUrl = this.$location.url();
                }
            }, 750)
            /* if (!window.angular.element(document).find('body').hasClass('pg-loaded')) {
             this.$timeout(() => {
             window.loading_screen.finish();
             }, 750)


             //  this.$scope.currentUrl = this.$location.url();
             } else {
             this.beginTransExit()
             }*/
        });

        /**
         *  Initiate transition when navigating between pages
         */
        this.$rootScope.$on('launchTransition', () => {
            this.launchTransition()
        });
    }

    //todo  should drop user into a error page.
    $onInit() {
        // Splash Screen Abort (believe this is now unnecessary following use of angular.element() callback to indicate load/render complete
        this.$timeout(function () {
            // note !angular.element(document).find('body').hasClass('pg-loaded')
            if (!window.angular.element(document).find('body').hasClass('pg-loaded')) {
                window.loading_screen.finish();
            }
        }, 60000);
    };


    launchTransition() {
        // note angular.element(document).find('body').hasClass('pg-loaded')
        if (window.angular.element(document).find('body').hasClass('pg-loaded')) {
            this.uiViewStart = true;
            this.transitionInnerContent = true;
            this.jhloaded = false;
            this.jhloading = true;
            this.jhloadedInner = false;
            this.jhloadingInner = true;
            //  this.beginTransExit();
        }
    }


    beginTransExit() {
        //  return this.$q( (resolve, reject) => {
        console.log('root.controller transition exit');
        this.$timeout(() => {
            this.uiViewStart = false;
            this.jhloaded = true;
            this.jhloadedInner = true;
            this.$timeout(() => {
                this.transitionInnerContent = false;
                this.jhloading = false;
                this.jhloadingInner = false;
            }, 500)
        }, 1000);
        //  })
    }

}
;

RootController.$inject = RootControllerInjectables;
