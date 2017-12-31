let EditorRightControllerInjectables = ['$rootScope', 'EditorFactory', 'EditorDataFactory', '$uibModal'];

export default class EditorRightController {
    constructor($rootScope, EditorFactory, EditorDataFactory, $uibModal) {
        'ngInject';
        this.$rootScope = $rootScope;
        this.EditorFactory = EditorFactory;
        this.EditorDataFactory = EditorDataFactory;
        this.$uibModal = $uibModal;

        this.editorRightLoadImageUnbind = this.$rootScope.$on('editorRightLoadImage', (event, data) => {
        });

        this.updateImageUnbind = this.$rootScope.$on('updateImage', () => {
            this.postImage = this.EditorFactory.updatedImage;
        });
    }

    $onInit() {
        this.loadImage(this.srcImage);
    };

    $onDestroy() {
        this.editorRightLoadImageUnbind();
        this.updateImageUnbind();
    }

    /**
     *
     * @param {promise} cropPromise
     */
    completeCrop(cropPromise) {
        cropPromise.then((response) => {
            this.postImage = response;
        })
    }

    /**
     *
     * @param {Object} ImageData
     */
    loadImage(ImageData) {
        this.EditorDataFactory.base64Convert(ImageData.image_data.data, ImageData.contentType)
            .then((response) => {
                this.croppedImage = response;
                this.postImage = response;
                this.srcImage = response;
            });
    }


    selectFromCore() {
        let modalInstance = this.$uibModal.open({
            animation: true,
            size: 'lg',
            component: 'editorCrop',
            resolve: {
                existingData: this.$q.when(this.srcImage)
            }
        });

        modalInstance
            .result
            .then((selectedData) => {
            }, () => {
                console.info('modal-component dismissed at: ' + new Date());
            });
    }


}

EditorRightController.$inject = EditorRightControllerInjectables;