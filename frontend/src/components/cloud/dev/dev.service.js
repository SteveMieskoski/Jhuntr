let DevServiceInjectables = ['store'];

//import google from 'googleapis';
//let OAuth2 = google.auth.OAuth2

export class DevService {
    constructor(store) {
        this.CLIENT_ID = '';
        this.store = store;
    }



    authorize(){

    }


    demo(){

    }
}

DevService.$inject = DevServiceInjectables;