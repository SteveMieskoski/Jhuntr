let DriveControllerInjectables = ['$rootScope', "$sce", 'DriveService', 'googleApi', 'AppStorage', '$timeout'];
window.windowObjectReference = null;

export default class DriveController {
    constructor($rootScope, $sce, DriveService, googleApi, AppStorage, $timeout) {
        this._$rootScope = $rootScope;
        this._DriveService = DriveService;
        this.googleApi = googleApi;
        this._$sce = $sce;
        this._shelf = AppStorage;
        this._$timeout = $timeout;

        this.viewActive = true;
        this.hideLogin = false;

       this.googleLoginStateunbind =  this._$rootScope.$on('googleLoginState', (evt, data) =>{
            if(data){
                this._$timeout(() => {
                    this.list();
                }, 100);
            }
        })

    }

    // implement a short (~1sec) loading screen to account for authCheck and then (if true) the loading of the user's files.
    $onInit() {
        window.angular.element(this.loadComplete());
    }

    loadComplete() {
        this._$rootScope.$emit('navigationPageLoaded', 'CloudController');
    }

    $postLink(){

    }

    $onDestroy(){
        this.googleLoginStateunbind();
    }

    checkLoggedIn(state){
        this.hideLogin = state;
        console.log('show log in state', state);
        this._$rootScope.$emit('googleLoginState', state);
    }

    clearCloudProvider(){
        this._shelf.remove('current_cloud')
    }


    list() {
        this._DriveService.listAllFiles()
            .then((response) => {
                console.log('Drive File List response', response);
                this.fileList = response.result.files
            });
    }

    getAllFileMetaData(id) {
        this._DriveService.getAllFileMetaData(id)
            .then((response) => {
                this.allFileDetails = JSON.stringify(response.result, undefined, 2);
            })
    }

    addFileRefAsResume(fileId, index){
        this._DriveService.addFileRefAsResume(fileId)
            .then((response) =>{
                console.log(response);
                this.fileList[index] = response.result;
            })
    }

    removeFileRefAsResume(fileId, resId, index){
        this._DriveService.removeFileRefAsResume(fileId, resId)
            .then((response) =>{
                this.fileList[index] = response.result;
                console.log(response);
            })
    }


}

DriveController.$inject = DriveControllerInjectables;


// note: below, From the webedit example (modified slightly, had issue with displaying without the editor they used.  could try again n the future;
/* loadFile(file){
 this.showPDF = false;
 if(/google-apps/.test(file.mimeType)){
 let type = "application/pdf";
 this._DriveService.convertGoogleFile(file.id, type)
 .then((response) => {
 this.showPDF = true;
 this.documentContent = response.content;
 // this.documentView = this._$sce.trustAsResourceUrl(success.result.webViewLink);
 })
 .catch((err) => {
 console.log(err);
 this.allFileDetails = JSON.stringify(err, undefined, 2);
 })
 } else {
 this._DriveService.loadFile(file.id)
 .then((response) => {
 console.log(response);
 this.allFileDetails = JSON.stringify(response.result, undefined, 2);
 // this.allFileDetails = JSON.stringify(response.result, undefined, 2);
 })
 .catch((err) => {
 console.log(err);
 this.allFileDetails = JSON.stringify(err, undefined, 2);
 })
 }

 }*/