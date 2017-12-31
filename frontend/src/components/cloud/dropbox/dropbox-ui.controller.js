let DropboxUIControllerInjectables = ['$rootScope', 'DropboxService', 'store', '$http', '$cacheFactory', '$q'];

// note look into using a setup like auth0 uses when it parses the redirect url (capturing the url via a function called from a run block
// note: for getting the access_token

import Dropbox from "dropbox";


export default class DropboxUIController {
    constructor($rootScope, DropboxService, store, $http, $cacheFactory, $q) {
        this._$rootScope = $rootScope;
        this._DropboxService = DropboxService;
        this._store = store;
        this.http = $http;
        this.$cacheFactory = $cacheFactory;
        this.$q = $q;
        this.contents = [];
        this.filePaths = {};

        this.cache = this.$cacheFactory('dropboxui');

    }

    $onInit() {
        window.angular.element(this.loadComplete());
        let drop_token = this._store.get('dropbox');

        if (drop_token) {
            console.log(drop_token.access_token);
            this._DropboxService.ifAuthenticated(drop_token)
                .then((response) => {
                    this.contents = response;
                    this.addToFilePath('Dropbox', '');
                    //   this.contents = [];
                    console.log('dropbox response', response);
                    //    response.entries.forEach((file) => {
                    //        return this.contents.push(file);
                    //    });
                    // this.renderItems(response.entries);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            this._DropboxService.ifNotAuthenticated();
        }
    }

    loadComplete() {
        this._$rootScope.$emit('navigationPageLoaded', 'DropboxController');
    }

    beginAuth() {
        this._store.set('dropbox', 'get_access');
    }

    addToFilePath(folder, path) {
        let check = Object.keys(this.filePaths);
        if (check.indexOf(folder) >= 0) {
            let remove = check.splice(check.indexOf(folder) + 1);
            remove.forEach((key) => {
                delete this.filePaths[key]
            })
        } else {
            this.filePaths[folder] = path;
        }
    }

    addFileRefAsResume(file, index) {
        this.addingRes = index;
        console.log(file);
        //window.alert('do something with file or get a reference')
        this._DropboxService.getFileMetadata(file.path_display)
            .then((response) => {
                console.log(response);
                response['tag'] = response['.tag'];
                delete response['.tag'];
                this._DropboxService.addFileRefAsResume(response)
                    .then((response) => {
                        this.addingRes = null;
                        this.contents[index] = response;
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

    removeFileRefAsResume(metadata, index) {
        this._DropboxService.removeFileRefAsResume(metadata)
            .then((response) => {
                metadata.jhuntrSaved = false;
                this.contents[index] = metadata;
                console.log(response)
            })
            .catch((error) => {
                console.log(error);
            })
    }


    enterFolder(folder, path) {
        this.contents = [];
        this.getFolderFileList(path)
            .then((response) => {
                this.contents = response;
                this.addToFilePath(folder, path);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    getFolderFileList(path) {
        return this.$q.resolve(this._DropboxService.getFileList(path));
    }


    getMetadata(file) {
        this._DropboxService.getFileMetadata(file.path_display)
            .then((response) => {
                console.log('File metadata', response);
            })
    }

    getPreview(file, index) {

        this._DropboxService.getAFilePreview(file.path_display)
            .then((response) => {

                this.previewLink = response.link;
                console.log('file preview', response);
                this.previewReady = index;
            })
    }

    altPreview(file) {
        this._DropboxService.previewAlt(file.path_display)
            .then((response) => {
                console.log(response);
            })
    }


    fileDownload(file, index) {
        this.previewReady = index;
        this._DropboxService.fileDownload(file.path_display)
            .then((response) => {
                this.previewReady = null;
                this._DropboxService.viewPdfModal(response.data)
                    .result
                    .then(response => {
                        console.log(response);
                    }, () => {
                        console.info('modal-component dismissed at: ' + new Date());

                    })
            })
            .catch((error) => {

            })
    }

    getSharedThenDownload() {

    }


}

DropboxUIController.$inject = DropboxUIControllerInjectables;