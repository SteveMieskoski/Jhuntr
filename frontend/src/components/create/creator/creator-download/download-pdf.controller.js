let DownloadPdfControllerInjectables = ['host', '$sce', 'store'];

export default class DownloadPdfController {
    constructor(host, $sce, store) {
        'ngInject';
        this.host = host.hostUrl;
        this.$sce = $sce;
    }

    $onInit() {

        this.pdfPathFull = this.resolve.details.pdfPathFull;
        this.userFileName = this.resolve.details.userFileName;

        this.pdfData = this.$sce.trustAsResourceUrl(this.pdfPathFull);
    };

    ok() {
        this.close({
            $value: 'closed'
        });
    };
}

DownloadPdfController.$inject = DownloadPdfControllerInjectables;