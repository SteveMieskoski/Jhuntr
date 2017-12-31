let ImportCoreControllerInjectables = ['featureConstants', 'coreViewDetails', '$q', 'CreatorDataFactory', 'CreatorUpdateFactory'];

export default class ImportCoreController {
    constructor(featureConstants, coreViewDetails, $q, CreatorDataFactory, CreatorUpdateFactory) {
        'ngInject';
        this.featureConstants = featureConstants;
        this.coreViewDetails = coreViewDetails;
        this.$q = $q;
        this.CreatorDataFactory = CreatorDataFactory;
        this.CreatorUpdateFactory = CreatorUpdateFactory;
    }

    $onInit() {
        this.showDetails = false;
        this.coreData = this.resolve.coreData;
        this.existingData = this.resolve.existingData;
        console.log(this.resolve.coreData);
        if (this.coreData) this.parseMaster(this.coreData);
    };


    parseMaster(data) {

         let sectionsList = window.angular.copy(this.featureConstants.allSections);
         this.itemLabelFields = window.angular.copy(this.featureConstants.sectionLabelField);
         this.sectionLabel = window.angular.copy(this.featureConstants.sectionsObject);

        this.sectionLabel['basics'] = 'Contact Details';
        this.holdingList = {};
        this.selectedList = {};
        let keys = Object.keys(data);
        let len = keys.length;
        while (len--) {
            if (sectionsList.indexOf(keys[len]) && Array.isArray(data[keys[len]])) { //note angular.isArray(data[keys[len]])
                let arrLength = data[keys[len]].length;
                if (arrLength > 0) {
                    this.holdingList[keys[len]] = data[keys[len]];

                    this.selectedList[keys[len]] = [];
                    while (arrLength--) {
                        this.selectedList[keys[len]][arrLength] = false;
                    }
                }
            }
        }
        if (data.attachments) {
            this.holdingList['attachments'] = data.attachments;
        }
    }


    viewContent(key, value) {
        this.showDetails = true;
        this.popoverContent = {};
        if (this.coreViewDetails.hasOwnProperty(key)) {
            console.log('has key?', key);
            let viewDetails = this.coreViewDetails[key];
            for (let prop in viewDetails) {

                if (value.hasOwnProperty(prop)) {
                    console.log(prop);
                    if (prop == 'location') {
                        this.popoverContent[viewDetails['location']['city']] = value[prop]['city'];

                    } else if (prop == 'details') {
                        this.popoverContent['Detail'] = [];
                        for (let i = 0; i < value['details'].length; i++) {
                            this.popoverContent['Details'][i] = value['details'][i]['detail'];
                        }
                    } else if (prop == 'icon') {
                        console.log('icon', value['icon']);
                        this.popoverContent['Icon'] = value['icon']
                    } else {
                        this.popoverContent[viewDetails[prop]] = value[prop];

                    }
                }
            }
        }


    }


    triggerFromCore() {
        this.importFromCore().then((response) => {
            this.existingData = response;
        })
    }


    importFromCore() {
        return this.$q((resolve, reject) => {
            this.addSelected().then((response) => {
                this.checkWithCurrent(response, this.existingData).then((response) => {
                    console.log(response);
                    if (response.create.length > 0) {
                        this.createSectionsContainer(this.existingData, angular.copy(response.create))
                            .then((responseOuter) => {
                                console.log('responseOuter:', responseOuter);
                                this.addItemsContainer(this.existingData, response.add).then((responseInner) => {
                                    resolve(responseInner);
                                    console.log('responseInner 1: ', responseInner);
                                })
                            })

                    } else {
                        this.addItemsContainer(this.existingData, response.add).then((responseInner) => {
                            resolve(responseInner);
                            console.log('responseInner 2:', responseInner);
                        })
                    }
                })
            })
        })
    }

    currentData(toCopy) {
        return angular.copy(toCopy);
    }

    addSelected() {
        return this.$q((resolve, reject) => {
            let toImport = {};
            let keys = Object.keys(this.selectedList);
            let l = keys.length;
            for (let n = 0; n < l; n++) {
                if (this.selectedList[keys[n]].indexOf(true) >= 0) {
                    toImport[keys[n]] = [];
                }
                for (let i = 0; i < this.selectedList[keys[n]].length; i++) {
                    if (this.selectedList[keys[n]][i] == true) {
                        toImport[keys[n]].push(this.holdingList[keys[n]][i]);
                        //toImport[keys[n]].push(angular.merge({},this.holdingList[keys[n]][i]));
                    }
                }
            }
            console.log('toImport before resolve', toImport);
            resolve(toImport);
        })
    }

    checkWithCurrent(forImport, existing) {
        return this.$q((resolve, reject) => {
            this.addItemList = {};
            this.createSectionList = [];
            for (let prop in forImport) {
                if (existing.hasOwnProperty(prop) && Array.isArray(existing[prop])) { //note angular.isArray(existing[prop])
                    if (existing[prop].length > 0) {
                        this.addItemList[prop] = forImport[prop];
                    } else {
                        this.createSectionList.push(prop);
                        this.addItemList[prop] = forImport[prop];
                    }
                }
            }
            console.log('checkWithCurrent', this.addItemList, this.createSectionList);
            resolve({add: this.addItemList, create: this.createSectionList});
        })
    }

    createSectionsContainer(existingData, sections) {
        return this.$q((resolve, reject) => {
            resolve(this.createSections(existingData, sections));
        })
    }

    createSections(existingData, sections) {
        console.log('createSections', existingData, sections);
        let section = sections.pop();
        this.CreatorUpdateFactory.addSections(existingData, section).then((response) => {
            if (sections.length > 0) {

                this.createSections(response, sections);
            } else {
                return response;
            }
        })
    }


    addItemsContainer(existingData, sections) {
        return this.$q((resolve, response) => {
            resolve(this.AddItems(existingData, sections));
        })
    }

    AddItems(existingData, sections, sectionList) {
        console.log('addItems', existingData, sections, sectionList);
        if (!sectionList) {
            sectionList = Object.keys(sections);
        }
        if (sectionList.length >= 1) {
            let sectionKey = sectionList.pop();
            this.itemAdding(existingData, sectionKey, sections[sectionKey], sectionList, sections)
        } else {
            console.log('existingData return from Add Items', existingData);
            return existingData;
        }
    }

    itemAdding(existingData, section, sectionArray, sectionList, origSectionObject) {
        console.log('itemAdding', existingData, section, sectionArray, sectionList, origSectionObject);
        let sectionItem = sectionArray.pop();
        //  console.log('itemAddingvexistingData', existingData);
        if (existingData._id)
            this.CreatorUpdateFactory.addRecord(section, existingData._id).then((response) => {
                sectionItem._id = response._id;
                existingData[section].push(angular.extend({}, response, sectionItem));  //note angular.extend
                if (sectionArray.length > 0) {
                    //     console.log(sectionArray.length);
                    //     console.log('existingData bottom itemAdding', existingData);
                    this.itemAdding(existingData, section, sectionArray, sectionList, origSectionObject);
                } else {
                    this.AddItems(existingData, origSectionObject, sectionList)
                }
            })
    }

}


ImportCoreController.$inject = ImportCoreControllerInjectables;