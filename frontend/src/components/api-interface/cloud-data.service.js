let CloudDataServiceInjectables = ['$rootScope', '$http', 'host', '$location', 'store', 'endPoints', 'UtilFactory', '$q', 'ApiUtilities'];

export class CloudDataService {
    constructor($rootScope, $http, host, $location, store, endPoints, UtilFactory, $q, ApiUtilities) {
        'ngInject';
        this._$q = $q;
        this.$rootScope = $rootScope;
        this.$http = $http;
        this.host = host.host;
        this.$location = $location;
        this._store = store;
        this.routes = endPoints.integrations;
        this.UtilFactory = UtilFactory;
        //  this._resModel = resModel;
        this._ApiUtilities = ApiUtilities;
    }


    dropboxDownload(path) {
        let token = this._store.get('dropbox');
        if (token) {
            let userId = this._store.get('userID');
            if (!userId) {
                return this._ApiUtilities.getInternalUserId()
                    .then((response) => {
                        return this.$http.post(this.host() + this.routes.cloud.dropbox.downloadFile + response, {
                            token: token,
                            path: path
                        });
                    })
                    .catch((err) => {
                        console.log('createNewRes Error: ', err);
                    })
            } else {
                return this.$http.post(this.host() + this.routes.cloud.dropbox.downloadFile + userId, {
                    token: token,
                    path: path
                });
            }

        } else {
            return this._$q.reject('no dropbox account present');
        }
    }

    companyLookup(domain, name) {
        let data = domain ? {domain: domain} : {name: name};
        return this.$http.post(this.host() + this.routes.services.companyLookup, data)
            .then((response) => {
            console.log(response);
                return response.data.data;
            })
            .catch((error) => {
                console.log('CloudDataService company lookup error', error);
                return error;
            })
    }




}


CloudDataService.$inject = CloudDataServiceInjectables;