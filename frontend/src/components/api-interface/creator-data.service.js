let CreatorDataFactoryInjectables = ['$rootScope', '$http', 'host', '$location', 'store', 'endPoints', 'UtilFactory', '$q', 'ApiUtilities'];

export class CreatorDataFactory {
    constructor($rootScope, $http, host, $location, store, endPoints, UtilFactory, $q, ApiUtilities) {
        'ngInject';
        this._$q = $q;
        this.$rootScope = $rootScope;
        this.$http = $http;
        this.host = host.host;
        this.$location = $location;
        this._store = store;
        this.routes = endPoints;
        this.UtilFactory = UtilFactory;
      //  this._resModel = resModel;
        this._ApiUtilities = ApiUtilities;
    }

    errorHandler(err){
        //console.log(error);
       this.UtilFactory.httpError(err)
    }

	getInternalUserId(){
        return this._ApiUtilities.getInternalUserId();
    }
    // accessed from creator input component
    /**
     *
     * @param {string} section
     * @param {string} saveId
     */
    addData(section, saveId) {
        console.log('CreatorDataService.addData RUN');
        let resId = saveId ? saveId : this.$location.search().res;
        return this.$http.get(this.host() + this.routes.creator.add + resId + '/' + section);
    }

    // accessed from creator listing component
    createNewRes() {
        let userId = this._store.get('userID');
        if (!userId) {
            return this._ApiUtilities.getInternalUserId()
                .then((response) => {
                return this.$http.get(this.host() + this.routes.creator.createNew + response);
            })
                .catch((err) => {
                    console.log('createNewRes Error: ', err);
                })
        } else {
            return this.$http.get(this.host() + this.routes.creator.createNew + userId);
        }
    }

    createNewAltRes(schema, data){
        let userId = this._store.get('userID');
        if (!userId) {
            return this._ApiUtilities.getInternalUserId()
                .then((response) => {
                    return this.$http.post(this.host() + this.routes.creator.createNewAlt + response +'/' + schema, data);
                })
                .catch((err) => {
                    console.log('createNewRes Error: ', err);
                })
        } else {
            return this.$http.post(this.host() + this.routes.creator.createNewAlt + userId  +'/' + schema, data);
        }
    }

    /**
     *
     * @param {string} resId
     */
    copyRes(resId) {
        return this.$http.get(this.host() + this.routes.creator.copy + resId)
            .then((response) => {
                return response.data.data;
            })
            .catch((err)=>{this.errorHandler(err)});
    }

    // accessed from creator component
    /**
     *
     * @param {string} saveId
     */
    getAndCreatePdf(saveId) {
        let resId = saveId ? saveId : this.$location.search().res;
        // use GET verb, but disable caching for this route.
        return this.$http.get(this.host() + this.routes.converter.downloadMain + resId)
            .then((response) => {
                return response.data;
            })
            .catch((err)=>{this.errorHandler(err)});
    }

    // accessed from root.config (route resolves)
    /**
     *
     * @param {string} ID
     * @param {boolean} initial
     * &Event {creator-dataloaded}
     */
    getData(ID, initial) {
        let locResId = this.$location.search();
        let resId = locResId.res ? locResId.res : ID;
        return this.$http.get(this.host() + this.routes.creator.retrieve + resId)
            .then((response) => {
                if (initial) {
                    this.$rootScope.$emit('creator-dataloaded');
                }
                //return this._resModel.populate(response.data.data[0]);
                return response.data.data[0];
            })
            .catch((err)=>{this.errorHandler(err)});
    }

    // accessed from creator listing component
    /**
     *
     */
    getResList() {
        let userId = this._store.get('userID');
        return this.$http.get(this.host() + this.routes.creator.list + userId, {params: {otherSource: 1}})
            .then((response) => {
                console.log(response.data.data);
                return response.data.data;
            })
            .catch((err)=>{this.errorHandler(err)});
    }

    // accessed from root.config (route resolves)
    /**
     *
     * @param {string} name
     * @param {string} id
     */
    getTemplateDetails(name, id) {
        let queryName = name ? '?name=' + name : 'none';
        let query = id ? queryName + '&id=' + id : queryName;
        return this.$http.get(this.host() + this.routes.creator.templateDetails + query)
            .then((response) => {
                return response.data;
            })
            .catch((err)=>{this.errorHandler(err)});
    }

    // accessed from creator input component
    /**
     *
     * @param {string} section
     * @param {object} data
     * @param {string} saveId
     */
    removeData(section, data, saveId) {
        let resId = saveId ? saveId : this.$location.search().res;
        let removeData = {};
        removeData[section] = [data];
        return this.$http.post(this.host() + this.routes.creator.remove + resId, removeData);
    }

    // accessed from creator listing component
    removeRes(resId, userId) {
        return this.$http.delete(this.host() + this.routes.creator.removeRes + resId );
    }

    /**
     *
     * @param {string} userID - objectId used to link the data items to the user
     */
    retreiveMasterRes(userID) {
       // let userId = userID ? userID : this._store.get('userID');
        if (!userID) {
            return this._ApiUtilities.getInternalUserId()
                .then((response) => {
                    return this.$http.get(this.host() + this.routes.creator.retrieveMaster + response)
                        .then((response) => {
                            return response.data.data;
                        })
                        .catch((err)=>{this.errorHandler(err)});
                })
                .catch((err)=>{this.errorHandler(err)});
        } else {
            return this.$http.get(this.host() + this.routes.creator.retrieveMaster + userID)
                .then((response) => {
                    return response.data.data;
                })
                .catch((err)=>{this.errorHandler(err)});
        }
    }

    // accessed from creator component
    /**
     *
     * @param {object} data - entire data object describing the active res
     * @param {string} resId - objectId of the active res
     */
    saveData(data, resId) {
        console.log('saveData', data);
        let resObjectId = resId ? resId : this.$location.search().res;
        return this.$http.put(this.host() + this.routes.creator.update + resObjectId, data)
            .then((response) => {
                //   UtilFactory.emitPayload('unsavedChanges', false);

               // return this._resModel.updateAll(response.data.data);
                console.log('SAVE RESPONSE', response);
                return response.data.data
            })
            .catch((err)=>{this.errorHandler(err)});
    }

    // accessed from features update component
    /**
     *
     * @param {string} section - section name to create
     * @param {string} saveId - objectId of the active res
     */
    sectionCreate(section, saveId) {
        console.log('sectionCreate: ', section, ' saveId: ', saveId);
        let resId = saveId ? saveId : this.$location.search().res;
        let data = {section: section};
        return this.$http.get(this.host() + this.routes.creator.sectionsCreate + resId + '/' + section)
            .then((response) => {
            console.log('section create response', response);
                //return this._resModel.addOrUpdateSection(response.data.data, section);
                return response;
            })
            .catch((err)=>{this.errorHandler(err)});
    }

    /**
     *
     * @param {string} resId - objectId of the active res
     * @param {string} userID - objectId used to link the data items to the user
     */
    setMaster(resId, userID) {
        let userId = userID ? userID : this._store.get('userID');
        if (!userId) userId = this._ApiUtilities.getInternalUserId();
        return this.$http.get(this.host() + this.routes.creator.setMaster + userId + '/' + resId)
            .then((response) => {
                return response.data.data;
            })
            .catch((err)=>{this.errorHandler(err)});
    }

    // accessed from creator listing component
    /**
     *
     * @param {string} resId - objectId for the res to update
     * @param {string} newLabel - label to replace the existing label
     */
    updateResLabel(resId, newLabel) {
        let data = {ref_label: newLabel};
        return this.$http.put(this.host() + this.routes.creator.updateLabel + resId, data);
    }

    // accessed from features update component, display service,
    /**
     *
     * @param {object} data - object containing an object or array of objects representing the data content of the section (or just the design data object)
     * @param {string} saveId - objectId of the active res
     */
    updateSectionListing(data, saveId) {
        console.log('updateSectionListing: ', data, ' saveId: ', saveId);
        let resId = saveId ? saveId : this.$location.search().res;
        return this.$http.put(this.host() + this.routes.creator.sectionsUpdate + resId, data)
            .then((response) => {
               // return this._resModel.updateDesignSection(response.data.data);
                return response;
            })
            .catch((err)=>{this.errorHandler(err)});
    }

    /**
     *
     * @param {string} type
     */
    ViewPdf(type) {
        let pdfData;
        let docId = this.$location.search();
        return this.$http.get(this.host() + '/db/file/' + docId.oId + '/' + type)
            .then((response) => {
                let pdfPathFull = this.host() + response.data;
                pdfData = this.$sce.trustAsResourceUrl(pdfPathFull);
                return pdfData;
            })
            .catch((err)=>{this.errorHandler(err)});
    }
}



CreatorDataFactory.$inject = CreatorDataFactoryInjectables;

