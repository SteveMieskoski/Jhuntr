
export class ImageUpload{
    // functionality moved to creator-image-upload/image-upload.controller.js
/*
    upload(file) {
        var blob = this.Upload.dataUrltoBlob(file, 'blob');
        this.Upload.upload({
            url: url,
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
    }*/
}