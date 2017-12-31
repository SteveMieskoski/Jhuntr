let BoxServiceInjectables = ['store'];

export class BoxService{
    constructor(store){
        this.CLIENT_ID = '';
        this.store = store;
    }


}

BoxService.$inject = BoxServiceInjectables;