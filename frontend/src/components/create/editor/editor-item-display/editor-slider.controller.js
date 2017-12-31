let SliderControllerInjectables = ['featureConstants', 'CreatorUpdateFactory'];

export default class SliderController {
    constructor(featureConstants, CreatorUpdateFactory) {
        'ngInject';
        this.featureConstants = featureConstants;
        this.CreatorUpdateFactory = CreatorUpdateFactory;
       // this.showSlideIn = false;
    }

    $onInit() {
        this.initContentData = this.editorMain.initContentData;
        this.sectionLabelField = this.featureConstants.sectionLabelField;
    }

    removeRecord(section, data, index) {
        this.CreatorUpdateFactory.removeRecord(section, data, this.initContentData._id).then((response) => {
            this.initContentData[section].splice(index, 1);
        })
    }
}

SliderController.$inject = SliderControllerInjectables;