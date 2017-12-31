let ImageUploadControllerInjectables = ['Upload', 'host', '$location', 'UtilFactory'];

export default class ImageUploadController {
    constructor(Upload, host, $location, UtilFactory) {
        'ngInject';
        this.Upload = Upload;
        this.host = host.host;
        this.$location = $location;
        this.UtilFactory = UtilFactory;

        this.showCropper = false;
        this.uploadInProgress = true;
        this.imageData = {};
        this.resId = $location.search();

        this.url = this.host() + '/upload/image/' + this.resId.res;
    }


    submit(uploadData) {
        if (uploadData) {  // todo move validation to pre-cropping step
            this.upload(uploadData);
        }
    }

    upload(file) {
        var blob = this.Upload.dataUrltoBlob(file, 'blob');
        this.Upload.upload({
            url: this.url,
            method: 'POST',
            data: {file: blob}
        }).then((resp) => {
            console.log(resp);
            this.imageData = resp.data.data;
            if (resp.data.error_code === 0 || resp.status === 200) { //validate success
                this.uploadSuccess = true;
            } else {
                this.uploadError = true;
            }
        }, (resp) => { //catch error
            this.uploadError = true;
            console.log('Error status: ' + resp.status);
        }, (evt) => {
            this.progress = parseInt(100.0 * evt.loaded / evt.total);
            if (this.progress == 100 && !this.uploadError) {
                this.uploadInProgress = false;
                this.uploadComplete = true;
            }
        }).catch((err) => {
                console.log('Upload Error', err);
            }
        );
    }

    cancelUpload() {
        this.uploadCanceled = true;
        this.Upload.upload.abort();
    }

    ok() {
        this.close({
            $value: this.imageData
        });
    };


    cancel() {
        this.dismiss({
            $value: 'cancel'
        });
    };

    convertToBase64(files) {
        /* angular.copy({
         name: files.name,
         size: files.size
         }); */
        this.fileDetails = {
            name: files.name,
            size: files.size
        };
        this.Upload.base64DataUrl(files).then((urls) => {
            this.file = urls;
        });
    }

}


ImageUploadController.$inject = ImageUploadControllerInjectables;