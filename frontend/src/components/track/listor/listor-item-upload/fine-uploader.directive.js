import qq from 'fine-uploader';
import dialogPolyfill from 'dialog-polyfill';
//import controller from "./item-upload.controller.js";
/*
 ['$scope', function($scope){


 $scope.setUploadLabel = function(label){
 //	$scope.itemLabel = label;
 }

 }],
 */
fineUploaderDirective.$inject = ['$compile', '$interpolate', 'store'];

export function fineUploaderDirective($compile, $interpolate, store) {
		return {
			restrict: "A",
			replace: true,

			link: function($scope, element, attrs, ctrl) {
				let userProfile = store.get('profile');
				userProfile = JSON.parse(userProfile);
				let user_id = userProfile.user_id;
				$scope.itemLabel = "";
				$scope.itemUrl = "";
				$scope.uploadPdf = false;


                let endpoint = attrs.uploadServer,
					notAvailablePlaceholderPath = attrs.notAvailablePlaceholder,
					waitingPlaceholderPath = attrs.waitingPlaceholder,
					acceptFiles = attrs.allowedMimes,
					sizeLimit = attrs.maxFileSize,
					largePreviewSize = parseInt(attrs.largePreviewSize),
					allowedExtensions = JSON.parse(attrs.allowedExtensions),
					previewDialog = document.querySelector('.large-preview'),

					uploader = new qq.FineUploader({
						debug: true,
						element: element[0],
						autoUpload: false,
						multiple: false,
						folders: false,

						request: {
							endpoint: endpoint,
							inputName: 'file'
						},

						validation: {
							acceptFiles: acceptFiles,
							allowedExtensions: allowedExtensions,
							sizeLimit: sizeLimit,
                            itemLimit: 1
						},

						deleteFile: {
							endpoint: endpoint,
							enabled: false
						},

						thumbnails: {
							placeholders: {
								notAvailablePath: notAvailablePlaceholderPath,
								waitingPath: waitingPlaceholderPath
							}
						},

						display: {
							prependFiles: true
						},

						failedUploadTextDisplay: {
							mode: "custom"
						},

						retry: {
							enableAuto: false
						},

						chunking: {
							enabled: false
						},

						resume: {
							enabled: true
						},

						callbacks: {
							onSubmitted: function(id, name) {
								let fileEl = this.getItemByFileId(id),
									thumbnailEl = fileEl.querySelector('.thumbnail-button');

								if(thumbnailEl){
                                    thumbnailEl.addEventListener('click', function() {
                                        openLargerPreview($scope, uploader, previewDialog, largePreviewSize, id);
                                    });
								}
							}
						}
					});

				$scope.doUpload = function(){
					// gather identifying information for the user and for the target posting (i.e. itemLabel, itemUrl)
					let params = {id: user_id, label: $scope.itemLabel, url: $scope.itemUrl};
					uploader.setParams(params);
					uploader.uploadStoredFiles();
				};

				dialogPolyfill.registerDialog(previewDialog);
				$scope.closePreview = closePreview.bind(this, previewDialog);
				bindToRenderedTemplate($compile, $scope, $interpolate, element);
			}
		}
	}

	function isTouchDevice() {
		return "ontouchstart" in window || navigator.msMaxTouchPoints > 0;
	}

	function initButtonText($scope) {
		var input = document.createElement("input");

		input.setAttribute("multiple", "false");

		if (input.multiple === true && !qq.android()) {
			$scope.uploadButtonText = "Select File";
		}
		else {
			$scope.uploadButtonText = "Select a File";
		}
	}

	function initDropZoneText($scope, $interpolate) {
		if (qq.supportedFeatures.folderDrop && !isTouchDevice()) {
			$scope.dropZoneText = "Drop File";
		}
		else if (qq.supportedFeatures.fileDrop && !isTouchDevice()) {
			$scope.dropZoneText = "Drop File Here";
		}
		else {
			$scope.dropZoneText = $scope.$eval($interpolate("Press '{{uploadButtonText}}'"));
		}
	}

	function bindToRenderedTemplate($compile, $scope, $interpolate, element) {
		$compile(element.contents())($scope);

		initButtonText($scope);
		initDropZoneText($scope, $interpolate);
	}

	function openLargerPreview($scope, uploader, modal, size, fileId) {
		uploader.drawThumbnail(fileId, new Image(), size).then(function(image) {
			$scope.largePreviewUri = image.src;
			$scope.$apply();
			modal.showModal();
		});
	}

	function closePreview(modal) {
		modal.close();
	}


