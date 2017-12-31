let CreatorInputControllerInjectables = ['dataTemplate', 'selectOptions', 'CreatorUpdateFactory', '$timeout', '$rootScope', 'UtilFactory'];

export default class CreatorInputController {
    constructor(dataTemplate, selectOptions, CreatorInputService, $timeout, $rootScope, UtilFactory) {
        'ngInject';
        this._dataTemplate = dataTemplate;
        this.selectOptions = selectOptions;
        this._CreatorInputService = CreatorInputService;
        this._$timeout = $timeout;
        this._$rootScope = $rootScope;
        this._UtilFactory = UtilFactory;

        this.signalSent = false;
        this.isDirty = false;

        this.cleanStateListener = this._$rootScope.$on('unsavedChanges', (event, data) => {
            if (!data) {
                this.isDirty = false;
            }
        });
    }

    // Life Cycle Events
    $onInit() {
        this.forEdit = 0;
    };

    $postLink() {
        this._$timeout(() => {
            if (window.angular.isArray(this.existingData)) {
                if (this.existingData.length < 1) {
                    this.existingData.push(window.angular.copy(this._dataTemplate[this.inputSelection]));
                }
            } else {
            }
        }, 500)
    };

    $onDestroy() {
        this.cleanStateListener();
    }

    dirtyValue() {
        if (!this.isDirty) {
            this.isDirty = !this.isDirty;
            this._UtilFactory.emitPayload('unsavedChanges', true);
        }
    }

    /**
     *
     * @param {number} index - section entry index for which a detail entry is to be added
     */
    addDetail(index) {
        this.existingData[index].details.push({detail: "", show: true});
    }

    /**
     *
     * @param {number} sectionIndex - section entry index for which a detail entry is to be added
     * @param {number} detailIndex - detail index for the detail to be removed
     */
    // No call to backend.  item should be removed upon save. todo: check if item is actually removed or if db call is necessary.
    removeDetail(sectionIndex, detailIndex) {
        this.existingData[sectionIndex].details.splice(detailIndex, 1);
    }

    addRecord() {
        this._CreatorInputService.addRecord(this.inputSelection)
            .then((response) => {
            console.log('addRecord response', response);
                this.existingData.push(response);
                this.forEdit = this.existingData.length - 1;
            })
            .catch(this._UtilFactory.httpError)
    }

    /**
     *
     * @param {string} section - section name to remove an entry from
     * @param {object} data - data of the section to be removed (used to obtain the objectId of the particular record)
     * @param {number} index - index of the section entry to be removed
     */
    removeRecord(section, data, index) {
        this.existingData.splice(index, 1);
        this._CreatorInputService.removeRecord(section, data)
            .then((response) => {
            })
            .catch(this._UtilFactory.httpError)
    };


}

CreatorInputController.$inject = CreatorInputControllerInjectables;
