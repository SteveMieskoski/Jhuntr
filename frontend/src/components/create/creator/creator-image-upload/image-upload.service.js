let ImageUploadServiceInjectables = ['$uibModal', '$rootScope'];

export class ImageUploadService {
    constructor($uibModal, $rootScope){
        'ngInject';
        this.$uibModal = $uibModal;
        this._$rootScope = $rootScope;
    }

    imageUpload() {
        let modalInstance = this.$uibModal.open({
            animation: true,
            size: 'lg',
            component: 'imageupload',
            resolve: {}
        });

        modalInstance.result.then((selectedData) => {
            console.log('selectedData', selectedData);
            this._$rootScope.$emit('photoUploaded', selectedData);
        }, () => {
            console.info('modal-component dismissed at: ' + new Date());
        });
    }
}

ImageUploadService.$inject = ImageUploadServiceInjectables;