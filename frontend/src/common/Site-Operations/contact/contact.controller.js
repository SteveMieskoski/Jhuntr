let ContactControllerInjectables = ['$rootScope', 'store', 'SiteOperationsDataFactory'];

export default class ContactController {
    constructor($rootScope, store, SiteOperationsDataFactory) {
        'ngInject';
        this.$rootScope = $rootScope;
        this.store = store;
        this.SiteOperationsDataFactory = SiteOperationsDataFactory;

        this.emailModel = {}
    }


    $postLink() {
        if (this.$rootScope.isAuthenticated) {
            this.loggedInForm = true;
            let userProfile = this.store.get('profile');
            this.emailModel.contactEmail = userProfile.email;
        } else {
            this.loggedInForm = false;
        }
        this.$rootScope.$emit('navigationPageLoaded', 'contact.controller');
    };

    sendEmail(emailData) {
        this.SiteOperationsDataFactory.emailSender(emailData, 'support').then((response) => {
            console.log(response);
            this.requestSuccess = response.data.result;
        });

    }
}

ContactController.$inject = ContactControllerInjectables;