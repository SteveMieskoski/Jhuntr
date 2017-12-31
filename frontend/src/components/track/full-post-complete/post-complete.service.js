let PostCompleteServiceInjectables = ['$rootScope', 'CreatorDataFactory', '$q', 'gloginService', 'googleApi', '$timeout'];

export class PostCompleteService {
    constructor($rootScope, CreatorDataFactory, $q, gloginService, googleApi, $timeout) {
        this.$rootScope = $rootScope;
        this.CreatorDataService = CreatorDataFactory;
        this.gloginService = gloginService;
        this.googleApi = googleApi;
        this.$timeout = $timeout;
        this.$q = $q;
        this.currentExternalId = '';
    }

    parseResume(res) {
        return this.CreatorDataService.getData(res, false)
            .then((response) => {
                console.log(response);
                switch (response._kind) {
                    case 'DropBoxRefResume':
                        return this.parseDropBox(response);
                        break;
                    case 'DriveRefResume':
                        return this.parseGoogle(response);
                        break;
                    case 'CoreResume':
                        this.parseInternal(response);
                        break;
                    default:
                        console.log('default case', response);
                        break;
                }
            })


    }


    parseDropBox(data) {
        return this.$q((resolve, reject) => {
            console.log('dropbox', data);
            resolve(data);
        })
    }

    parseGoogle(data) {
        console.log('google', data);
        this.currentExternalId = data.id;
        return this.gloginService.checkAuth()
            .then((response) => {
                if (response && !response.error) {
                    console.log('logged in response: ', response);
                    return this.googleApi
                        .then((gapi) => {
                            return this.$q((resolve, reject) => {
                                this.checkForGapi(resolve, data.id);
                            })
                        })
                } else {
                    console.log('not logged-in in response: ', response);
                    this.$q.reject({state: true})
                }

            })
            .catch((error) => {
                console.log(error);
                this.$q.reject({state: false, cloud: 'google', error: error})
            });
    }

    checkForGapi(resolve, id) {
        this.$timeout(() => {
            if (gapi.client.drive) {
                console.log('check true');
                return resolve(gapi.client.drive.files.get({
                    "fileId": id,
                    "fields": '*'
                }))
            } else {
                console.log('check false');
                this.checkForGapi(resolve);
            }
        }, 100);
    }

    googleLogin() {
        return this.gloginService.login()
            .then((response) => {
                return this.googleApi
                    .then((gapi) => {
                        return gapi.client.drive.files.get({
                            "fileId": this.currentExternalId,
                            "fields": '*'
                        })
                    })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    parseInternal(data) {
        console.log('internal', data);
    }
}

PostCompleteService.$inject = PostCompleteServiceInjectables;

