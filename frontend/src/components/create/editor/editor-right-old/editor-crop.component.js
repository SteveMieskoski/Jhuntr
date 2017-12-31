import  template from'./editor-crop.component.html';

export const cropComponent =  {
	require: {
		editorMain: "^^editorMain"
	},
	bindings: {
		srcImage: '=',
		showCropper: '&'
	},
	template,
	controller: class EditorCropController {
		constructor($uibModal) {
            'ngInject';
			this.$uibModal = $uibModal;
		}


		$onInit() {
			this.postImage = this.editorMain.postImage;
			this.croppedImage = this.srcImage;
		}

		applyCrop(image) {
			this.editorMain.applyCrop(image);
		};

		showCrop() {
			this.showCropper();
		}

		// close(){
		//    this.editorMain.cropPosting = true;
		//     console.log(test);
		// }


	}
};




