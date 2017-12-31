let DropboxControllerInjectables = ['$rootScope', 'DropboxService', 'store', '$http'];


// note look into using a setup like auth0 uses when it parses the redirect url (capturing the url via a function called from a run block
// note: for getting the access_token

export default class DropboxController {
    constructor($rootScope, DropboxService, store, $http) {
        this._$rootScope = $rootScope;
        this._DropboxService = DropboxService;
        this._store = store;
        this.http = $http;
        this.contents = [];

        this.dropboxUI = false;
    }

    $onInit() {
        window.angular.element(this.loadComplete());
        let drop_token = this._store.get('dropbox');

        if (drop_token && drop_token !== 'get_access') {
            this.dropboxUI = true;
        } else {
            this.dropboxUI = false;
        }
    }

    loadComplete() {
        this._$rootScope.$emit('navigationPageLoaded', 'DropboxController');
    }



    associate() {
    }

    metadata(file) {
        this._DropboxService.getFileMetadata(file.id)
            .then((response) => {
                console.log(response);
                response.data['tag'] = response.data['.tag'];
                delete response.data['.tag'];
                this._DropboxService.addFileRefAsResume(response.data)
                    .then((response) => {

                        console.log(response)
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch((error) => {
                console.log(error);
            })
    }


}

DropboxController.$inject = DropboxControllerInjectables;