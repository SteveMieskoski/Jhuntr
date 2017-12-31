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
        let modalInstance = this.$uibModal.open({
            animation: true,
            size: 'lg',
            component: 'viewpdf',
            resolve: {
                item: this._$q.when(filePath)
            }
        });

        modalInstance.result.then((selectedData) => {
        }, () => {
            console.info('modal-component dismissed at: ' + new Date());
        });
    }



}

ViewPdfService.$inject = ['$uibModal', '$q'];