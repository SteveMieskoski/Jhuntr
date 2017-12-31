let CreatorDisplayPopoverServiceInjectables = ['$rootScope', '$timeout', 'CreatorUpdateFactory', 'CreatorFactory', 'UtilFactory', 'popupUrls', 'featureConstants', 'iconList', 'GeneralFactory', '$q'];

export class CreatorDisplayPopoverService {
    constructor($rootScope, $timeout, CreatorUpdateFactory, CreatorFactory, UtilFactory, popupUrls, featureConstants, iconList, GeneralFactory, $q) {
        'ngInject';
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;
        this.CreatorUpdateFactory = CreatorUpdateFactory;
        this.CreatorFactory = CreatorFactory;
        this.UtilFactory = UtilFactory;
        this.popupUrls = popupUrls;
        this.featureConstants = featureConstants;
        this.iconList = iconList;
        this.GeneralFactory = GeneralFactory;
        this.$q = $q;

    }

    /**
     *
     * @param {boolean/string} value
     * @param {string} section
     * @param {array} timer
     * @param {array} optionsOpen
     * @param {?boolean} sectionList
     * @returns {*}
     */
    popoverOpen(value, section, timer, optionsOpen, sectionList) {
        return this.$q((resolve, reject) =>{
            if (value) {
                if (!timer[section]) timer[section] = [];
                if (timer[section].length > 0) {
                    let tLength = timer[section].length;
                    while (tLength--) {
                        this.$timeout.cancel(timer[section][tLength])
                    }
                    resolve({timer: timer, optionsOpen: optionsOpen, sectionList: sectionList});
                }
                if (value === true) {
                    optionsOpen[section] = true;
                    resolve({timer: timer, optionsOpen: optionsOpen, sectionList: sectionList});
                }
            } else {
                timer[section].push(this.$timeout(() => {
                    optionsOpen[section] = false;
                    sectionList = false;
                    timer[section] = [];
                }, 500));
                resolve({timer: timer, optionsOpen: optionsOpen, sectionList: sectionList});
            }
        })

    }

    /**
     *
     * @param {boolean/string} value
     * @param {string} section
     * @param {number} index
     * @param {array} timerItem
     * @param {array} optionsOpenItem
     * @returns {*}
     */
    popoverOpenItem(value, section, index, timerItem, optionsOpenItem) {
        return this.$q((resolve, reject) => {
            if (!optionsOpenItem[section]) optionsOpenItem[section] = [];
            if (!timerItem[section]) timerItem[section] = [];
            if (value) {
                if (!timerItem[section][index]) timerItem[section][index] = [];
                if (timerItem[section][index].length > 0) {
                   // console.log('%s timerItem cancel:', section, timerItem[section][index]);
                    let tLength = timerItem[section][index].length;
                    while (tLength--) {
                        this.$timeout.cancel(timerItem[section][index][tLength])
                    }
                    resolve({timerItem: timerItem, optionsOpenItem: optionsOpenItem});
                }
                if (value !== 'alt') {
                    optionsOpenItem[section][index] = true;
                    resolve({timerItem: timerItem, optionsOpenItem: optionsOpenItem});
                }
            } else {
                timerItem[section][index].push(this.$timeout(() => {
                    optionsOpenItem[section][index] = false;
                    timerItem[section][index] = [];
                }, 250));
                resolve({timerItem: timerItem, optionsOpenItem: optionsOpenItem});
            }
        })
    }

    /**
     *
     * @param {string} section
     */
    buildPopupTitle(section) {
        this.popupTitle = this.featureConstants.sectionsObject[section] + ' Section:';
    };

    /**
     *
     * @param {string} popupChoice
     * @returns {*}
     */
    sectionOptions(popupChoice) {
        if (this.popupUrls[popupChoice]) {
            //    console.log('popupChoice: %s', popupChoice);
            return this.popupUrls[popupChoice];
        } else {
            //       console.log('popupChoice: sectionOptions');
            return this.popupUrls.sectionOptions;
        }
    }

}

CreatorDisplayPopoverService.$inject = CreatorDisplayPopoverServiceInjectables;