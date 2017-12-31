/**
 *  Description:
 */

let CreatorFactoryInjectables = ['$q', '$uibModal', '$rootScope', '$location', '$timeout', 'displayService', 'ViewPdfService', 'DownloadPdfService', 'CreatorDataFactory', 'UtilFactory',  'store', '$http', 'ImageUploadService'];

export class CreatorFactory {
    
    constructor($q, $uibModal, $rootScope, $location, $timeout, displayService, ViewPdfService, DownloadPdfService, CreatorDataFactory, UtilFactory,  store, $http, ImageUploadService){
		'ngInject';
        this._$q = $q;
        this._$timeout = $timeout;
        this.$uibModal = $uibModal;
        this._$rootScope = $rootScope;
        this.displayService = displayService;
        this._$location = $location;
        this._ViewPdfService = ViewPdfService;
        this._ImageUploadService = ImageUploadService;
        this._DownloadPdfService = DownloadPdfService;
        this._CreatorDataFactory = CreatorDataFactory;
        this._UtilFactory = UtilFactory;
        //this._resModel = resModel;
       // this.store = store; // is this used?
      //  this.$http = $http;  // is this used?
    }

    CreatorDataUpdated() {
        let locResId = this._$location.search();
        this._CreatorDataFactory.getData(locResId.res)
            .then(function (response) {
                return response;
            })
            .catch((err) => {
                console.log('ERROR creator component CreatorDataUpdated:', err);
            })
    };

    /**
     *
     * @param {object} templateDetails
     */
    storeTemplateDetails(templateDetails){
        this._CreatorDataFactory.templateDetails = templateDetails;
    };


    /**
     *
     * @param {string} resId - objectId of the active res or res objectId string provided as an argument
     */
    setMaster(resId) {  //todo implement some method for user feedback
        let setTo = resId ? resId : this._$location.search().res;
        this._CreatorDataFactory.setMaster(setTo);
        //  .then(function (response) {})
    }

    /**
     *
     * @param {object} resData  - data object describing the content of the entire active res
     */
    createAndDownloadPdf(resData) {
        this.saveData(resData)
            .then(
                this._CreatorDataFactory.getAndCreatePdf()
                    .then((response) => {
                        this._$rootScope.$emit('PdfRenderComplete');
                       // let basicData = resData.basics ? resData.basics : this._resModel.provide().basics;  //todo remove & link/fallback fill from constant instead
                        let basicData = resData.basics
                            ? Array.isArray(resData.basics)
                                ? resData.basics[0]
                                : 'resume'
                            : 'resume' ;
                        this._DownloadPdfService.downloadPdf(response.pdfFile, basicData[0]);
                    })
            )
    }

    /**
     *
     * @param {object} resData  - data object describing the content of the entire active res
     */
    saveData(resData) {
        return this._CreatorDataFactory.saveData(resData)
            .then((response) => {
                console.log('saveData response creator.service', response);
                this._$rootScope.$emit('unsavedChanges', false);
                return response;
            }).catch(this._UtilFactory.httpError);
    }

    /**
     *
     * @param {string} filePath - path to rendered pdf of active res
     */
    viewPdf(filePath) {
        this._ViewPdfService.viewPdf(filePath);
    }

    determinNumPages(){
        return this._$q((resolve) => {
            this._$timeout(() => {
                let resPage = document.querySelectorAll('#core-template')[0];
                let leftPage = document.querySelectorAll('.two-column-left')[0];
                let rightPage = document.querySelectorAll('.two-column-right')[0];
                if(leftPage && rightPage){
                    let columnHeight = leftPage.clientHeight > rightPage.clientHeight ? leftPage.clientHeight : rightPage.clientHeight;
                    let pageHeight = resPage.clientHeight + columnHeight;
                    let numPages = Math.round(pageHeight / 1100) * 1100;
                    this._$rootScope.$emit('navigationPageLoaded', 'CreatorFactory.determineNumPages');
                    resolve(numPages);
                } else {
                    resolve(1100);
                }

            }, 1000);
        })
    }

    imageUpload() {
          this._ImageUploadService.imageUpload();
    }

    // -------------------- Review items Below for transfer or removal (image & encoding related items are also present in the display module) -------------

    checkImagePresent(templateData) {
        return this._$q((resolve, reject) => {
            if (templateData.attachments) {
                if (templateData.attachments.img_data) {
                    resolve(this.base64Convert(templateData.attachments.img_data.data, templateData.attachments.img_contentType));
                } else {
                    resolve('assets/mrDefulto.png');
                }
            } else {
                resolve('assets/mrDefulto.png');
            }
        })
    }

    base64Convert(rawData, contentType) {
        return this.base64ArrayBuffer(rawData).then((response) => {
            return "data:" + contentType + ";base64," + response;
        })
    }

    base64ArrayBuffer(arrayBuffer) {
        return this._$q((resolve, reject) => {
            let base64 = '';
            let encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
            let bytes = new Uint8Array(arrayBuffer);
            let byteLength = bytes.byteLength;
            let byteRemainder = byteLength % 3;
            let mainLength = byteLength - byteRemainder;
            let a, b, c, d;
            let chunk;

            // Main loop deals with bytes in chunks of 3
            for (let i = 0; i < mainLength; i = i + 3) {
                // Combine the three bytes into a single integer
                chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];

                // Use bitmasks to extract 6-bit segments from the triplet
                a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
                b = (chunk & 258048) >> 12; // 258048   = (2^6 - 1) << 12
                c = (chunk & 4032) >> 6;// 4032     = (2^6 - 1) << 6
                d = chunk & 63;              // 63       = 2^6 - 1

                // Convert the raw binary segments to the appropriate ASCII encoding
                base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
            }

            // Deal with the remaining bytes and padding
            if (byteRemainder == 1) {
                chunk = bytes[mainLength];

                a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2

                // Set the 4 least significant bits to zero
                b = (chunk & 3) << 4; // 3   = 2^2 - 1

                base64 += encodings[a] + encodings[b] + '=='
            } else if (byteRemainder == 2) {
                chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];

                a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
                b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4

                // Set the 2 least significant bits to zero
                c = (chunk & 15) << 2; // 15    = 2^4 - 1

                base64 += encodings[a] + encodings[b] + encodings[c] + '='
            }

            //return base64
            resolve(base64);
        })

    }
};

CreatorFactory.$inject = CreatorFactoryInjectables;