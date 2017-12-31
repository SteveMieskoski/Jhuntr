let ItemUploadPdfPageInjectables = ['$rootScope'];


export default class ItemUploadPdfPage{
    constructor($rootScope){
        this.$rootScope = $rootScope;
    }

    $onInit(){
       // window.angular.element(this.pageLoaded());
        this.$rootScope.$emit('navigationPageLoaded', 'item-upload-pdf.controller');
    }

    pageLoaded() {
        this.$rootScope.$emit('navigationPageLoaded', 'item-upload-pdf.controller');
    }

}


ItemUploadPdfPage.$inject = ItemUploadPdfPageInjectables;