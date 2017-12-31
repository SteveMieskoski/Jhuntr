let IssuesControllerInjectables = ['$rootScope', 'store', 'SiteOperationsDataFactory'];


export default class IssuesController {
    constructor($rootScope, store, SiteOperationsDataFactory) {
        'ngInject';
        this.$rootScope = $rootScope;
        this.store = store;
        this.SiteOperationsDataFactory = SiteOperationsDataFactory;

        this.emailModel = {};
        this.supportChoices = ['-Select Request Category-', 'Other/General Question', 'Account Management', 'Error', 'Res Creation', 'Search'];
        this.emailModel.supportKey = this.supportChoices[0];
    }


    $postLink() {
        if (this.$rootScope.isAuthenticated) {
            this.loggedInForm = true;
            let userProfile = this.store.get('profile');
            this.emailModel.contactEmail = userProfile.email;
        } else {
            this.loggedInForm = false;
        }
        this.$rootScope.$emit('navigationPageLoaded', 'issues.controller');
    };

    sendEmail(emailData) {
        this.SiteOperationsDataFactory.emailSender(emailData, 'support').then((response) => {
            console.log(response);
            this.requestSuccess = response.data.result;
        });
    }
}




IssuesController.$inject = IssuesControllerInjectables;