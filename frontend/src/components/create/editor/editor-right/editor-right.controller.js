let EditorRightControllerInjectables = ['$rootScope', 'EditorFactory', 'EditorDataFactory', '$uibModal'];

export default class EditorRightController {
    constructor($rootScope, EditorFactory, EditorDataFactory, $uibModal) {
        'ngInject';
        this.$rootScope = $rootScope;
        this.EditorFactory = EditorFactory;
        this.EditorDataFactory = EditorDataFactory;
        this.$uibModal = $uibModal;

    }

    $onInit() {
        this.postData = this.postContent.data;
        console.log(this.postData);
    };

    $onDestroy() {

    }







}

EditorRightController.$inject = EditorRightControllerInjectables;