export class ViewPdfService {
    constructor($uibModal, $q){
        'ngInject';
        this.$uibModal = $uibModal;
        this._$q = $q;
    }

    /**
     *
     * @param {string} filePath
     */
    viewPdf(filePath) {
        return this.$uibModal.open({
            animation: true,
            size: 'lg',
            component: 'DropboxViewpdf',
            resolve: {
                item: this._$q.when(filePath)
            }
        });
    /*
        modalInstance.result.then((selectedData) => {
        }, () => {
            console.info('modal-component dismissed at: ' + new Date());
        });*/
    }



}

ViewPdfService.$inject = ['$uibModal', '$q'];