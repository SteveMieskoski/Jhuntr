let EditorTopControllerInjectables  = ['$rootScope', '$timeout', '$location'];

export default class EditorTopController {
    constructor($rootScope, $timeout, $location) {
        'ngInject';
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;
        this.$location = $location;
    }

    $onInit() {
        this.viewingPost = this.$location.search().post;
        this.crop = true;
        this.applyCrop = false;
        this.loadingNew = false;
    };

    save() {
        this.$rootScope.$emit('editorDataSave');
    }

    showStyleModal() {
        this.$rootScope.$emit('showStyleModal');
    }

    showImportCoreModal() {
        this.$rootScope.$emit('showImportCoreModal');
    }

    showCrop() {
        this.crop = !this.crop;
        this.applyCrop = !this.applyCrop;
        this.showCropper();
    }

    hideCrop() {
        this.$rootScope.$emit('cropComplete');
        this.loadingNew = true;
        this.applyCrop = !this.applyCrop;
        this.$timeout(() => {
            this.showCropper();
            this.loadingNew = false;
            this.crop = !this.crop;
        }, 500)
    }

}

EditorTopController.$inject = EditorTopControllerInjectables;