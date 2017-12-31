let DriveServiceInjectables = ['$cacheFactory', '$q', 'store', 'googleApi', 'CreatorDataFactory', '$timeout'];


export class DriveService {
    constructor($cacheFactory, $q, store, googleApi, CreatorDataFactory, $timeout) {
        this.$cacheFactory = $cacheFactory;
        this.store = store;
        this.googleApi = googleApi;
        this.$q = $q;
        this.service = CreatorDataFactory;
        this.$timeout = $timeout;

        this.DEFAULT_FIELDS = 'id,name,mimeType,capabilities(canEdit,canCopy),shared,size,permissions,webViewLink,hasThumbnail,thumbnailLink,iconLink,appProperties(jhuntrSaved,jhuntrId)';
        this.ALL_FIELDS = '*';

        this.cache = this.$cacheFactory('files');
    }

    combineAndStoreResults(metadata, content) {
        let file = {
            metadata: metadata,
            content: content
        };
        this.cache.put(metadata.id, file);
        return file;
    };

    listAllFiles() {
        return this.googleApi
            .then((gapi) => {
                return this.$q((resolve, reject) => {
                    this.checkForGapi(resolve);

                })
            })
    }

    checkForGapi(resolve){
    this.$timeout(() => {
        if(gapi.client.drive){
            console.log('check true');
            return  resolve(gapi.client.drive.files.list({
                "fields": "files(" + this.DEFAULT_FIELDS + ")"
            }))
        } else {
            console.log('check false');
            this.checkForGapi(resolve);
        }
    }, 100);
}

    getAllFileMetaData(id) {
        return this.googleApi
            .then((gapi) => {
                return gapi.client.drive.files.get({
                    "fileId": id,
                    "fields": this.ALL_FIELDS
                })
            })
    }

    addFileRefAsResume(fileId) {
        return this.getAllFileMetaData(fileId).then((response) => {
            return this.service.createNewAltRes('driveRef', response.result)
                .then((response) => {
                    return this.googleApi
                        .then((gapi) => {
                            return gapi.client.drive.files.update({
                                "fileId": fileId,
                                "fields": this.DEFAULT_FIELDS,
                                "appProperties": {"jhuntrSaved": true, "jhuntrId": response.data.data._id}
                            })
                        })
                })
        })

    }


    removeFileRefAsResume(fileId, resId) {
        let userId = this.store.get('userID');
        return this.service.removeRes(resId, userId)
            .then((response) => {
                return this.googleApi
                    .then((gapi) => {
                        return gapi.client.drive.files.update({
                            "fileId": fileId,
                            "fields": this.DEFAULT_FIELDS,
                            "appProperties": {"jhuntrSaved": null, "jhuntrId": null}
                        })
                    })
            })
    }


}

DriveService.$inject = DriveServiceInjectables;

/*
 // note loadFile and convertGoogleFile are related to the commented method at the bottom of drive.controller
 loadFile(fileId) {
 let file = this.cache.get(fileId);
 if (file) {
 return this.$q.when(file);
 }
 return this.googleApi.then((gapi) => {
 let metadataRequest = gapi.client.drive.files.get({
 fileId: fileId,
 supportsTeamDrives: true,
 fields: this.DEFAULT_FIELDS
 });
 let contentRequest = gapi.client.drive.files.get({
 fileId: fileId,
 supportsTeamDrives: true,
 alt: 'media'
 });
 return this.$q.all([this.$q.when(metadataRequest), this.$q.when(contentRequest)]);
 }).then((responses) => {
 return this.combineAndStoreResults(responses[0].result, responses[1].body);
 });
 };


 convertGoogleFile(fileId, type){
 let file = this.cache.get(fileId);
 if (file) {
 return this.$q.when(file);
 }
 return this.googleApi.then((gapi) => {
 let metadataRequest = gapi.client.drive.files.get({
 fileId: fileId,
 supportsTeamDrives: true,
 fields: this.DEFAULT_FIELDS
 });
 let contentRequest = gapi.client.drive.files.export({
 fileId: fileId,
 mimeType: type
 });
 return this.$q.all([this.$q.when(metadataRequest), this.$q.when(contentRequest)]);
 }).then((responses) => {
 return this.combineAndStoreResults(responses[0].result, responses[1].body);
 });
 }

 */