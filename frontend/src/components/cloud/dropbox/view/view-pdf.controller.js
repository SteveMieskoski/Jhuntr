let ViewPdfControllerInjectables = ['$location', '$sce', 'store'];


export default class ViewPdfController {
    constructor($location, $sce, store) {
        'ngInject';
        this._$location = $location;
        this._$sce = $sce;
        this._store = store;
       // this._UtilFactory = UtilFactory;
        // this.GeneralFactory = GeneralFactory;
    }

    $onInit() {
        let profile = JSON.parse(this._store.get('profile'));
        let pdfPathFull = this.host() + this.resolve.item;
        this.pdfData = this._$sce.trustAsResourceUrl(pdfPathFull);
    };

    host() {  // note: only here because it kept saying (cannot read property "protocol" of undefined when in root module service
        let protocol = this._$location.protocol();
        let host = this._$location.host();
        let port = this._$location.port();
        if (!port) {
            return protocol + '://' + host;
        } else {
            return protocol + '://' + host + ':' + port;
        }
    }

    ok() {
        this.close({
            $value: 'closed'
        });
    };

}

ViewPdfController.$inject = ViewPdfControllerInjectables;