let CreatorDisplayControllerInjectables = ['$scope', '$rootScope', '$timeout', 'popupUrls', 'featureConstants', 'iconList', 'popService',  'displayService', 'rootPath'];

export default class CreatorDisplayController {
    constructor($scope, $rootScope, $timeout, popupUrls, featureConstants, iconList, popService, displayService, rootPath) {
        'ngInject';
        this.$scope = $scope;
        this._$rootScope = $rootScope;
        this._$timeout = $timeout;
        this._popupUrls = popupUrls;
        this._featureConstants = featureConstants;
        this.iconList = iconList;
        this.popService = popService;
      //  this._resModel = resModel;
        this._displayService = displayService;
        this.rootPath = rootPath;

       // this.templateData = this._resModel.provide();

        this.isDirty = false;
        this.spacerLine = '';
        this.timer = {};
        this.timerItem = {};
        this.optionsOpen = {};
        this.optionsOpenItem = {};
        this.iconSelectIndex = 0;
        this.closeBasicPopover = {};
        this.sectionList = false;
        this._sectionListModal = this.sectionListModal;

        this.displayListener = this._$rootScope.$on('displayUpdate', (event, data) => {
            this.designData(data);
        });

        this.unbindPhotoUploaded = this._$rootScope.$on('photoUploaded', (event, data) => {
            console.log('photo upload checking');
            this._displayService.base64Convert(data.img_data.data, data.img_contentType).then((response) => {
                this.userImage = response;
            })
        });

        this.unbindPhotoListen = this._$rootScope.$on('photoStateChange', (event, data) => {
            this.showPhoto = data;
        });
        this.cleanStateListener = this._$rootScope.$on('unsavedChanges', (event, data) => {
            if (!data) {
                this.isDirty = false;
            }
        });

        this.$scope.$on('ordering.drag', (e, el) => {
            el.removeClass('ex-moved');
        });

        this.$scope.$on('ordering.drop', (e, el) => {
            el.addClass('ex-moved');
        });

        this.$scope.$on('ordering.over', (e, el, container) => {
            container.addClass('ex-over');
        });

        this.$scope.$on('ordering.out', (e, el, container) => {
            container.removeClass('ex-over');
        });
    }

    $onInit() {
        this.sectionListItem = this._featureConstants.sectionLabelField;
        this.templateSelection = this.templateData.name; //TypeError: Cannot read property 'name' of null
        console.log(this.templateData);
        this.designData(this.templateData);
        window.angular.element(this.cancelTransitionScreen());
    };

    $onChanges() {
        this._$timeout(this.designData(this.templateData), 500); //note: move to service ?
        this.checkLoadPicture();
    };

    $onDestroy() {
        this.unbindPhotoListen();
        this.displayListener();
        this.cleanStateListener();
        this.unbindPhotoUploaded();
    };

    /**
     *
     * @param {string} section - section name for use in populating the slider data
     */
    extraAction(section) {
        this._$rootScope.$emit('sliderSlideIn', section)
    }

    cancelTransitionScreen() {
        this._$timeout(() => {
            this._$rootScope.$emit('navigationPageLoaded', 'CreatorDisplayController')
        }, 750)
    }

    /**
     *
     * @param {string} type - type of icon/icon record location
     * @param {string} selected - icon selected
     * @param {string} section - section where the icon selection occured
     */
    iconSelected(type, selected, section) {
        this._displayService.iconSelected(type, selected, section, this.templateData, this.iconSelectIndex)
            .then((response) => {
                this.templateData = response.templateData;
                this.dirtyValue(true);
                if (response.closeBasicPopover) {
                    this.closeBasicPopover = {};
                }
            });
    }

    checkLoadPicture() {
        if (this.templateData && this.templateDetails.photo_option) {
            this.showPhoto = this.templateData.design.style_options.img_show;
            if (this.showPhoto) {
                this._displayService.checkImagePresent(this.templateData).then((response) => {
                    this.userImage = response;
                })
            }
        }
    }

    /**
     *
     * @param {boolean/string} value
     * @param {string} section
     */
    popoverOpen(value, section) {
        this.popService.popoverOpen(value, section, this.timer, this.optionsOpen, this.sectionList)
            .then((response) => {
                this.timer = response.timer;
                this.optionsOpen = response.optionsOpen;
                this.sectionList = response.sectionList;
            })
            .catch((err) => {
                console.log('ummm.... PopoverOpen never rejects?', err)
            });
    }

    /**
     *
     * @param {boolean/string} value
     * @param {string} section
     * @param {number} index
     */
    popoverOpenItem(value, section, index) {
        this.popService.popoverOpenItem(value, section, index, this.timerItem, this.optionsOpenItem)
            .then((response) => {
                this.timerItem = response.timerItem;
                this.optionsOpenItem = response.optionsOpenItem;
            })
            .catch((err) => {
                console.log('ummm.... PopoverOpenItem never rejects?', err)
            });
    }

    /**
     *
     * @param {string} section
     */
    buildPopupTitle(section) {
        this.popupTitle = this._featureConstants.sectionsObject[section] + ' Section:';
    };

    /**
     *
     * @param {string} popupChoice
     * @returns {*}
     */
    sectionOptions(popupChoice) {
        return this.popService.sectionOptions(popupChoice);
    }

    /**
     *
     * @param {boolean} value
     */
    dirtyValue(value) {
        if (!this.isDirty) {
            this.isDirty = !this.isDirty;
            this._$rootScope.$emit('unsavedChanges', value);
        }
    }

    /**
     *
     * @param {object} templateData
     */
    designData(templateData) {
        let designData = this._displayService.designData(templateData);
        for (let prop in designData.inner_templates) {
            this.$scope[prop] = designData.inner_templates[prop];
        }
        for (let prop in designData.style_options) {
            let camelProp = prop.replace(/(_\w)/g, (m) => {
                return m[1].toUpperCase();
            });
            this[camelProp] = designData.style_options[prop];
        }

    }

    /**
     *
     * @param {string} section
     */
    addRecord(section) {
        this._displayService.addRecord(section, this.templateData._id)
            .then((response) => {
                    this.dirtyValue(true);
                    this.templateData[section].push(response);
                    this._$rootScope.$emit('styleUpdate', this.templateData);
                }
            )
    }

    /**
     *
     * @param {string} section - section name to remove an entry from
     * @param {object} data - data of the section to be removed (used to obtain the objectId of the particular record)
     * @param {number} index - index of the section entry to be removed
     */
    removeRecord(section, data, index) {
        this.templateData[section].splice(index, 1);
        this.dirtyValue(true);
        this._displayService.removeRecord(section, data, this.templateData._id)
            .catch((err) => {
                    console.log('creator-display.controller -> removeRecord Error: ', err)
                }
            )
    };

    /**
     *
     * @param {string} section
     */
    removeSection(section) {
        this._displayService.removeSection(this.templateData, section)
            .then((response) => {
                    this.dirtyValue(true);
                    this.templateData = response;
                    this._$rootScope.$emit('styleUpdate', response);
                }
            )
    }

    /**
     *
     * @param {string} section
     * @param {number} sectionIndex
     * @param {number} detailIndex
     */
    removeDetailItem(section, sectionIndex, detailIndex) {
        this.templateData[section][sectionIndex].details.splice(detailIndex, 1);
    }


}


CreatorDisplayController.$inject = CreatorDisplayControllerInjectables;