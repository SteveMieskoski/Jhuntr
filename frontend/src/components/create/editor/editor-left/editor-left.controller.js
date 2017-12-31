let EditorLeftControllerInjectables = ['$rootScope', 'EditorFactory'];

export default class EditorLeftController {
    constructor($rootScope, EditorFactory) {
        'ngInject';
        this.$rootScope = $rootScope;
        this.EditorFactory = EditorFactory;

        this.dataSaveUnbind = this.$rootScope.$on('editorDataSave', () => {
            this.editorMain.saveData(false, this.initContentData);
        });

        this.styleShowUnbind = this.$rootScope.$on('showStyleModal', () => {
            this.EditorFactory.viewStyleOptions(this.initContentData);
        });

        this.ImportCoreModalUnbind = this.$rootScope.$on('showImportCoreModal', () => {
            this.EditorFactory.selectFromCore(this.initContentData);
        });

        this.showAllModalUnbind = this.$rootScope.$on('showAllModal', (evt, data) => {

            this.EditorFactory.viewAllSectionItems(this.initContentData, data).result.then((selectedData) => {
                this.initContentData = selectedData;
                return this.initContentData;
            }, () => {
                console.info('modal-component dismissed at: ' + new Date());
            });
        })
    }

    $onInit() {
        this.initContentData = this.editorMain.initData;
        this.templateDetails = this.editorMain.templateDetails;
        this.templateSelected = 'core';
    };


    showCurrentData() {
        //console.log(this.initContentData);
    }


    $onDestroy() {
        this.dataSaveUnbind();
        this.styleShowUnbind();
        this.showAllModalUnbind();
        this.ImportCoreModalUnbind();
    }

}

EditorLeftController.$inject = EditorLeftControllerInjectables;