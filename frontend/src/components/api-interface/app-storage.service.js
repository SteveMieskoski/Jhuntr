let AppStorageServiceInjectables = [];


export class AppStorageService {
    constructor() {
        this.userActs = {};
    }

    set(key, value){
        this.userActs[key] = value;
    }

    get(key){
        return this.userActs[key];
    }

    remove(key){
        delete this.userActs[key];
    }


}

AppStorageService.$inject = AppStorageServiceInjectables;