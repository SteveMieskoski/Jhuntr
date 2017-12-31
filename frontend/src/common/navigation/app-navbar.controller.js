let NavBarControllerInjectables = ['$scope', '$rootScope', '$location',  'AuthService', 'store', 'CreatorDataFactory'];

export default class NavBarController {
    constructor($scope, $rootScope, $location,  AuthService, store, CreatorDataFactory){
        'ngInject';
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$location = $location;
        this.AuthService = AuthService;
        this.store = store;
        this.CreatorDataFactory = CreatorDataFactory;

        this.isNavCollapsed = true;
        this.gettingUserId = false;
        this.statusCounts = {initial: 0, inProgress: 0, sent: 0, resolved: 0};
        this.totalActive = this.statusCounts.initial + this.statusCounts.inProgress + this.statusCounts.sent + this.statusCounts.resolved;

        this.$scope.$onRootScope('unsavedChanges', (event, data) => {
            console.log('are unsaved', data);
            this.areUnsaved = data;
        });
    }


    $doCheck() {
        let path = this.$location.path();

        this.checkIfTargetsPage(path);
        this.checkIfCreatorPage(path);


        this.isAuthenticated = this.$rootScope.isAuthenticated;
        this.statusCounts = this.$rootScope.statusCounts;

        if (this.isAuthenticated) {
            let internalUserId = this.store.get('userID');
            if(!internalUserId && !this.gettingUserId){
                this.gettingUserId = true;
                this.CreatorDataFactory.getInternalUserId();
            }
            if(this.userProfile === undefined){
                let userProfileString = this.store.get('profile');
                if(userProfileString){
                    this.userProfile = JSON.parse(userProfileString);
                    if(this.userProfile !== null){
                        this.user = this.userProfile.user_metadata ? this.userProfile.user_metadata.user_name : 'user';
                    }
                }

            }
        } else {
          //  this.checkLoginRenew(path);
        }
    };

    checkIfTargetsPage(path){
        if (/(targets)/.test(path)) {
            this.uploadPosting = true;
        } else {
            this.uploadPosting = false;
        }
    }

    checkIfCreatorPage(path){
        if (/(create)/.test(path)) {
            this.showSaveState = true;
        } else {
            this.showSaveState = false;
        }
    }

    checkLoginRenew(path){
        if (/(login|signup)/.test(path)) {
        } else {

        }
    }


    logout(){
        this.$rootScope.isAuthenticated = false;
        this.AuthService.logout();
    }

    showLogin(){
        this.$rootScope.$emit('showLogin');
    }


}


NavBarController.$inject = NavBarControllerInjectables;