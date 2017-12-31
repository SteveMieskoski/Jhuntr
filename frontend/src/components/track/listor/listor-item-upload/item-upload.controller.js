import qq from 'fine-uploader';
import dialogPolyfill from 'dialog-polyfill';

let ItemUploadControllerInjectables = ['$rootScope'];

export default class ItemUploadController {
	constructor($rootScope) {
		this.$rootScope = $rootScope;
		this.largerPreviewUri = '';
		this.modal = document.querySelector('.large-preview');

	}

	$onInit(){
      //  window.angular.element(this.pageLoaded());
        this.$rootScope.$emit('navigationPageLoaded', 'item-upload-pdf.controller');
	}

	$postLink() {
        this.$rootScope.$emit('navigationPageLoaded', 'item-upload-pdf.controller');

		let galleryUploader = new qq.FineUploader({
			element: document.getElementById("fine-uploader-gallery"),
			template: 'qq-template-gallery',
			autoUpload: false,
			request: {
				endpoint: '/posting/manualUpload'
			},
			thumbnails: {
				placeholders: {
					waitingPath: "node_modules/fine-uploader/fine-uploader/placeholders/not_available-generic.png",
					notAvailablePath: "node_modules/fine-uploader/fine-uploader/placeholders/waiting-generic.png"
				}
			},
			validation: {
				allowedExtensions: ['jpeg', 'jpg', 'gif', 'png']
			},
			callbacks: {
				onSubmitted: function(id, name){this.showPreview(id,name, galleryUploader )}
			}
		});

		//let largerPreviewUri;

		/*function openLargerPreview(uploader, modal, size, fileId) {
		 largerPreviewUri = this.largerImageUri;
		 uploader.drawThumbnail(fileId, new Image(), size)
		 .then(function (image) {
		 largePreviewUri = image.src;
		 //this.largePreviewUri = largePreviewUri;
		 //$scope.$apply();
		 modal.showModal();
		 });
		 }*/

		dialogPolyfill.registerDialog(document.querySelector('.large-preview'));

		//this.largePreviewUri = largePreviewUri;
		this.galleryUploader = galleryUploader;
	}

    pageLoaded() {
        this.$rootScope.$emit('navigationPageLoaded', 'item-upload.controller');
    }

	showPreview(id, name, uploader) {
		let fileEl = uploader.getItemByFileId(id),
			thumbnailEl = fileEl.querySelector('.thumbnail-button');

		thumbnailEl.addEventListener('click', function () {
			uploader.drawThumbnail(id, new Image(), 500).then(function (image) {
				this.largerPreviewUri = image.src;
				//this.largePreviewUri = largePreviewUri;
				//$scope.$apply();
				this.modal.showModal();
			})
		});

	}

	closePreview(modal) {
		modal.close();
	}

	uploadFile() {
		this.galleryUploader.uploadStoredFiles();
	}


	setupThing() {
		//setEndpoint (path[, identifier]);
		let newUpload = new qq.FineUploaderBasic;
		newUpload.addFiles(this.file);
	}

	addFile(file) {
		qq.addFiles(this.file, "/posting/manualUpload");
		console.log(this.file);
	}

	drawThumb() {
		//drawThumbnail (id, targetContainer[, maxSize[, fromServer[, customResizer]]])
	}

	uploadThing() {
		//uploadStoredFiles ()
		//clearStoredFiles ()
	}


}

ItemUploadController.$inject = ItemUploadControllerInjectables;