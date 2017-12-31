let AllItemsControllerInjectables = [];

export default class AllItemsController {
    constructor() {
        'ngInject';
    }

    $onInit() {
        this.templateData = this.resolve.existingData;
        this.section = this.resolve.section;
    };

    ok() {
        this.close({
            $value: vm.templateData
        });
    };


    cancel() {
        this.dismiss({
            $value: 'cancel'
        });
    };
}

AllItemsController.$inject = AllItemsControllerInjectables;