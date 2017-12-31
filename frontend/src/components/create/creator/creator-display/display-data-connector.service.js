
let DisplayDataConnectorServiceInjectables = ['CreatorDataFactory'];

export class DisplayDataConnectorService {
    constructor(CreatorDataFactory){
        'ngInject';
        this._CreatorDataFactory = CreatorDataFactory;
    }
}

DisplayDataConnectorService.$inject = DisplayDataConnectorServiceInjectables;