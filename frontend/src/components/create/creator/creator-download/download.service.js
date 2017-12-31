let DownloadPdfServiceInjectables = ['$q', '$uibModal', '$rootScope', '$location', 'store'];

export class DownloadPdfService {

    constructor($q, $uibModal, $rootScope, $location, store) {
        'ngInject';
        this._$q = $q;
        this.$uibModal = $uibModal;
        this._$rootScope = $rootScope;
        this.$location = $location;
        this.store = store;
    }

    host() {
        let proto = this.$location.protocol();
        let base = this.$location.host();
        let port = this.$location.port();
        if (!port) {
            return proto + '://' + base;
        } else {
            return proto + '://' + base + ':' + port;
        }
    }

    downloadPdfPrep(filePath){
        return this._$q((resolve, reject) => {
            let pdfPathFull = this.host() + filePath;
            console.log(pdfPathFull);
            let profile = JSON.parse(this.store.get('profile'));
            let userFileName = profile.name ? profile.name.replace(/[\s|\.]/, '_') : 'resume';
            resolve({pdfPathFull: pdfPathFull, userFileName: userFileName})
        })

    }

    /**
     *
     * @param {string} filePath - path to rendered pdf of active res
     * @param {object} basics - information contained in the basic section of the active res (currently unUsed
     */
    downloadPdf(filePath, basics) {
        let modalInstance = this.$uibModal.open({
            animation: true,
            size: 'lg',
            component: 'downloadpdf',
            resolve: {
               // item: this._$q.when(filePath),
               // basics: this._$q.when(basics),
                details: this.downloadPdfPrep(filePath)

            }
        });

        modalInstance.result.then((selectedData) => {
        }, () => {
            //this._$rootScope.$broadcast('PdfRenderComplete');
          //  this._$rootScope.$emit('PdfRenderComplete');
            console.info('modal-component dismissed at: ' + new Date());
        });
    }
}

DownloadPdfService.$inject = DownloadPdfServiceInjectables;