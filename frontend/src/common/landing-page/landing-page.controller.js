let AppControllerInjectables = ['$rootScope', 'store', '$timeout'];

export default class AppController {

    constructor($rootScope, store, $timeout){
        'ngInject';
        this.$rootScope = $rootScope;
        this.store = store;
        this.$timeout = $timeout;

      //  this.removeLoading = true;
        this.userProfile = undefined;
        this.userID = '';
        this.user = '';
        this.registeredUser = this.$rootScope.isAuthenticated;
        window.angular.element(this.pageLoadComplete())
    }

    $onInit() {
      //  window.angular.element(this.pageLoadComplete())
    };

    $postLink() {
        if (this.registeredUser) {
            if (this.userProfile === undefined) {
                this.userID = this.store.get('userID');
                this.userProfile = JSON.parse(this.store.get('profile'));
                if (this.userProfile !== null) {
                    this.user = this.userProfile.user_metadata.user_name;
                }
            }
        }
    };


    pageLoadComplete(){
       // this.removeLoading = true;
        this.$rootScope.$emit('navigationPageLoaded', 'landing-page.controller');
     //   window.loading_screen.finish();
        console.log('landing page: page load complete');
    }
}

AppController.$inject = AppControllerInjectables;