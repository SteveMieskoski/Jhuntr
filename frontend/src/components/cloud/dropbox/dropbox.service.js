let DropboxServiceInjectables = ['store', '$http', 'CreatorDataFactory', 'AppStorage', '$q', '$cacheFactory', 'CloudDataService', 'ViewPdfService'];

import {utils} from "./dropbox.utils.js";
import Dropbox from "dropbox";

export class DropboxService {
    constructor(store, $http, CreatorDataFactory, AppStorage, $q, $cacheFactory, CloudDataService, ViewPdfService) {
        // this.CLIENT_ID = 'f8hf1wnpcpafwp0'; // app folder only
        this.CLIENT_ID = '5qmnjjpar68kuqx';  // full access
        this.service = CreatorDataFactory;
        this.store = store;
        this.$q = $q;
        this._shelf = AppStorage;
        this.$http = $http;
        this.$cacheFactory = $cacheFactory;
        this.contents = [];
        this.client = null;
        this.pathBase = '';
        this.dbx = Dropbox;
        this.CloudDataService = CloudDataService;
        this.ViewPdfService = ViewPdfService;

        this.cache = this.$cacheFactory('dropbox');
    }


    dropdoxLib() {
        return Dropbox;
    }

    parseAccessTokenFromUrl() {
        return this.$q((resolve, reject) => {
            let drop_token = utils.parseQueryString(window.location.hash);
            console.log('drop_token: ', drop_token['!#access_token']);
            this.store.set('dropbox', drop_token['!#access_token']);
            if (this.store.get('dropbox') && this.store.get('dropbox') !== 'get_access') {
                this.parseSavedResumes()
                    .then((response) => {
                        resolve(drop_token);
                    });

            } else {
                reject();
            }
        })
    }

    parseSavedResumes() {
        return this.service.getResList()
            .then((response) => {
                console.log(response);
                let parsed = [];
                let query = {};
                response.forEach((item) => {
                    if (item._kind === 'DropBoxRefResume') {
                        parsed.push(item);
                        query[item.id] = item._id;
                    }
                });
                this.cache.put('resumeList', parsed);
                this.cache.put('queryList', query);
                return query;
            });
    }

    // If the user was just redirected from authenticating, the urls hash will
    // contain the access token.
    isAuthenticated() {
        return !!this.parseAccessTokenFromUrl();
    }

    ifAuthenticated() {
        // Create an instance of Dropbox with the access token and use it to
        // fetch and render the files in the users root directory.
        let token = this.store.get('dropbox');
        this.client = new Dropbox({accessToken: token});
        if (this.cache.get('queryList')) {
            return this.getFileList('');
        } else {
            return this.parseSavedResumes()
                .then((response) => {
                    return this.getFileList('');
                })
        }

    };

    ifNotAuthenticated() {
        // Set the login anchors href using dbx.getAuthenticationUrl()
        this.dbx = new Dropbox({clientId: this.CLIENT_ID});
        return this.dbx.getAuthenticationUrl('http://localhost:9000/');
    }

    dropboxRequester(url, data) {
        let token = this.store.get('dropbox');
        let fullUrl = 'https://api.dropboxapi.com/2/' + url;
        return this.$http({
            method: 'POST',
            url: fullUrl,
            data: data,
            headers: {Authorization: "Bearer " + token}
        })
    }


    getFileList(path) {
        if (this.client) {
            return this.client.filesListFolder({path: path})
                .then((response) => {
                    let contents = [];
                    let queryObj = this.cache.get('queryList');
                    let query = Object.keys(queryObj);
                    console.log('drop box', response.entries);
                    response.entries.forEach((file) => {
                        if (query.indexOf(file.id) >= 0) {
                            file['jhuntrSaved'] = true;
                            file["jhuntrId"] = queryObj[file.id]
                        }
                        contents.push(file);
                    });
                    console.log('getFileList: contents:', contents);
                    return contents;
                    // this.renderItems(response.entries);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }


    /*   getFileMetadata(path) {
     let url = 'files/get_metadata';
     let data = {
     path: path,
     include_media_info: false,
     include_deleted: false,
     include_has_explicit_shared_members: false
     };
     return this.dropboxRequester(url, data)
     }*/

    viewPdfModal(filePath){
        this.ViewPdfService.viewPdf(filePath)
    }

    checkForPath(fileOpath) {
        if (fileOpath.path) {
            fileOpath = fileOpath.path;
        }
        return this.pathBase + fileOpath;
    }

    getFileMetadata(fileOpath) {
        if (fileOpath.path) {
            fileOpath = fileOpath.path;
        }
        let path = this.pathBase + fileOpath;
        return this.client.filesGetMetadata({path: path})
    }

    getFileThumbnail(fileOpath) {
        if (fileOpath.path) {
            fileOpath = fileOpath.path;
        }
        let path = this.pathBase + fileOpath;
        let url = 'files/get_metadata';
        let data = {
            path: path,
            format: "jpeg",
            size: "w64h64"
        };
        return this.dropboxRequester(url, data)
    }

    getAFilePreview(fileOpath) {
        let token = this.store.get('dropbox');
        let url = 'https://content.dropboxapi.com/2/files/get_preview';
        let filePath = this.checkForPath(fileOpath);

        return this.$http({
            method: 'POST',
            url: url,
            headers: {
                'Authorization': 'Bearer ' + token,
                'Dropbox-API-Arg': `{"path": "${filePath}"}`
            },
        })
        // return this.client.filesGetTemporaryLink({path: path});
    }

    previewAlt(path) {
        return this.client.filesGetPreview({path: path});
    }

    fileDownload(fileOpath) {
        let path = this.checkForPath(fileOpath);
        return this.CloudDataService.dropboxDownload(path)
            .then((response) => {
                console.log(response);
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            })
    }


    addFileRefAsResume(metadata) {
        return this.service.createNewAltRes('dropboxRef', metadata)
            .then((response) =>{
                let list = this.cache.get('queryList');
                list[metadata.id] = response._id;
                this.cache.put('queryList', list);
                metadata['jhuntrSaved'] = true;
                metadata['jhuntrId'] = response.id;
                return this.$q.resolve(metadata);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    removeFileRefAsResume(metadata, resId) {
        let userId = this.store.get('userID');
        return this.service.removeRes(metadata.jhuntrId, userId)
    }


}

DropboxService.$inject = DropboxServiceInjectables;



/*
 getFileList(path, root) {
 if(root) {

 if (this.client) {
 return this.client.filesListFolder({path: path})
 .then((response) => {
 let contents = [];
 let queryObj = this.cache.get('queryList');
 let query = Object.keys(queryObj);
 console.log(response.entries);
 response.entries.forEach((file) => {
 if (query.indexOf(file.id) >= 0) {
 file['jhuntrSaved'] = true;
 file["jhuntrId"] = queryObj[file.id]
 }
 contents.push(file);
 });
 return contents;
 // this.renderItems(response.entries);
 })
 .catch((error) => {
 console.log(error);
 })
 } else {
 console.log('no client specified for getFileList');
 }
 } else {
 if (this.client) {
 return this.client.filesListFolder({path: path})
 .then((response) => {
 let contents = [];
 let queryObj = this.cache.get('queryList');
 let query = Object.keys(queryObj);
 console.log(response.entries);
 response.entries.forEach((file) => {
 if (query.indexOf(file.id) >= 0) {
 file['jhuntrSaved'] = true;
 file["jhuntrId"] = queryObj[file.id]
 }
 contents.push(file);
 });
 return this.$q.resolve(contents);
 // this.renderItems(response.entries);
 })
 .catch((error) => {
 console.log(error);
 })
 } else{
 console.log('no client specified for getFileList');
 }
 }
 }
 */