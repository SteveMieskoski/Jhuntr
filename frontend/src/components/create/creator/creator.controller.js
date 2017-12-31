/**
 *
 *
 */
let CreatorControllerInjectables = ['CreatorFactory', '$rootScope', '$timeout', 'GeneralFactory', 'rootPath'];

export default class CreatorController {

    constructor(CreatorFactory, $rootScope, $timeout, GeneralFactory, rootPath) {
        'ngInject';
        this._CreatorFactory = CreatorFactory;
        this._$rootScope = $rootScope;
        this._$timeout = $timeout;
        this._GeneralFactory = GeneralFactory;
        this._rootPath = rootPath;

        this.initData = {};
        this.CreatorDataUpdatedUnbind = this._$rootScope.$on('creatorDataUpdated', this.CreatorDataUpdated());
        this.recordItemAddedUnbind = this._$rootScope.$on('recordItemChange', this.determinNumPages());
        this.renderPdfCompleteUnbind = this._$rootScope.$on('PdfRenderComplete', () => {
            this.downloadPending = false;
            this.priorPdf = true;
        }); //
    }


    // Listeners
    CreatorDataUpdated() {
        let updatedData = this._CreatorFactory.CreatorDataUpdated();
        if (this.initData) {
            this.initData = updatedData;  //note: (was before wrapped in if stmt) throwing a type error (cannot set property 'initData' of undefined
        }
    };

    recordItemAdded() {
        this.determinNumPages();
    };

    // Life Cycle Events

    $onInit() {
        this.extraPages = {};
        this.creatorDisplayLoaded = true;
        this.showInputData = true;
        this.sectionsUpdated = false;
        this.colorsUpdate = false;
        this.downloadPending = false;
        this.priorPdf = false;
        this.smallScreen = false;
        this.collapseInputs = true;
        this.collapseStyles = false;
        this.downloadPendingOverlay = this._rootPath + '/utils/download-prep-screeen.html';
        this.popupTemplates = this._rootPath + '/creator-display/popovers/popup.template.html';
        this.itemPopupTemplates = this._rootPath + '/creator-display/popovers/section-item.template.html';

       // this._CreatorFactory.storeTemplateDetails(this.templateDetails);
        this.initContentData = this.initData;
        this.priorPdf = this.checkForPriorPdf(this.initContentData);
        this._GeneralFactory.emitPayload('unsavedChanges', false);

        window.angular.element(this.loadComplete());

    };

    $onDestroy() {
        this.CreatorDataUpdatedUnbind();
        this.recordItemAddedUnbind();
        this.renderPdfCompleteUnbind();
    };

    checkForPriorPdf(resData){
        let pdfRef = resData.pdf_ref ? resData.pdf_ref : '1';
        return (pdfRef.length > 2);
    }

    loadComplete() {
        this._$timeout(() => {
            this._$rootScope.$broadcast('elastic:adjust');
            this.determinNumPages();
        }, 500);
    }

    determinNumPages() {
        this._CreatorFactory.determinNumPages().then((response) => {
            this.extraPages = {
                height: (+response + 30) + 'px'
            };
        })
    }


    // todo: use this to prompt user to save if form contains changed data.
    // will need to create clean states on entry, save, and download because each saves the current content in the database.
    uiCanExit() {
        this.uiCanExit = function () { //un-implemented
        };
    }

    useTemplate(key) { //note: not implemented
        this.templateChoice = key;
    }

    removePlaceholder() {  //note: prior to using the transition screen used to space out main content.
        this.creatorDisplayLoaded = !this.creatorDisplayLoaded;
    }

    setMaster() {
        this._CreatorFactory.setMaster();
    }

    createAndDownloadPdf() {
        this._CreatorFactory.createAndDownloadPdf(this.initContentData);
    }

    viewPdf() {
        if (this.initContentData.pdf_ref.length > 2) {
            this._CreatorFactory.viewPdf(this.initContentData.pdf_ref);
        }
    }

    saveData() {
        return this._CreatorFactory.saveData(this.initContentData);
    }

}

CreatorController.$inject = CreatorControllerInjectables;