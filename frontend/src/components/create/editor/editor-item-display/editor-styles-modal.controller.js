let StyleModalControllerInjectables = [];

export default class StyleModalController {
    constructor() {
        'ngInject';
    }

    $onInit() {
        this.inData = this.resolve.existingData;
    };

    ok() {
        this.close({
            $value: ''
        });
    };


    cancel() {
        this.dismiss({
            $value: 'cancel'
        });
    };

}

StyleModalController.$inject = StyleModalControllerInjectables;