let UserAccountControllerInjectables = ['AccountDataFactory', 'skillsJS', '$rootScope', '$timeout', 'store'];

export default class UserAccountController {
    constructor(AccountDataFactory, skillsJS, $rootScope, $timeout){
        'ngInject';
        this.AccountDataFactory = AccountDataFactory;
        this.skillsJS = skillsJS;
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;
        this.store = store;

        this.allDesired = skillsJS;
        this.modifySkills = false;
        this.showSkillsEdit = false;
    }

    $onInit() {
        this.getUser();
        window.angular.element(this.pageLoaded())
    };

    pageLoaded() {
        this.$rootScope.$emit('navigationPageLoaded', 'UserAccountController');
    };

    getUser() {
        this.AccountDataFactory.getUser().then( (response) => {
            this.userData = response;
            this.removeLoading = true;
            this.resList();
            this.$timeout( () => {

            }, 750);
        })
    }

    forgetCloudProvider(){
        this.store.remove('cloud_provider');
    }

    updateSkills() {
        if (this.skillsPossessed) {
            this.AccountDataFactory.updateUserSkills(this.skillsPossessed)
                .then( (response) => {
                    this.skillsPossessed = undefined;
                    this.getUser();
                })
        }
    }

    removeSkill() {
        if (this.skillsPossessed) {
            this.AccountDataFactory.removeUserSkill(this.skillsPossessed)
                .then( (response) => {
                    this.skillsPossessed = undefined;
                    this.getUser();
                })
        }
    }

    updateUser() {
        this.AccountDataFactory.updateUser().then( (response) => {

        })
    }

    resList() {
        this.AccountDataFactory.getResList().then( (response) => {
            this.resListing = response;
        })
    }

}

UserAccountController.$inject =  UserAccountControllerInjectables;