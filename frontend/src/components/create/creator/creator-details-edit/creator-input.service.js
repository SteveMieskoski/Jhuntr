let CreatorInputServiceInjectables = ['$rootScope', 'CreatorDataFactory'];

export class CreatorInputService{
    constructor($rootScope, CreatorDataFactory){
        'ngInject';
        this._CreatorDataFactory = CreatorDataFactory;
        this._$rootScope = $rootScope;
    }

    /**
     *
     * @param {string} section
     * @param {string} saveId
     */
    addRecord(section, saveId) {
        console.log('CreatorDataFactory.addData Call CreatorInputService');
        return this._CreatorDataFactory.addData(section, saveId).then( (response) => {
            return response.data.data;
        })
    }

    /**
     *
     * @param {string} section
     * @param {object} data
     * @param {string} saveId
     */
    removeRecord(section, data, saveId) {
        return this._CreatorDataFactory.removeData(section, data, saveId).then( (response) => {
            this._$rootScope.$emit('recordItemChange');
            return response;
        })
    }

}


CreatorInputService.$inject = CreatorInputServiceInjectables;