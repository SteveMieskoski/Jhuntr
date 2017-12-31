import template from "./gapi-login.component.html";

let GapiLoginControllerInjectables = ['gloginService', 'gUtil'];

export default class GapiLoginController {
    constructor(gloginService, gUtil) {
        this.gloginService = gloginService;
        this.gUtil = gUtil;
    }

    $onInit(){
        this.gloginService.checkAuth()
            .then((response) => {
                if (response && !response.error) {

                    console.log('logged in response: ',response);
                    this.loggedIn({state :true});
                } else {
                    console.log('logged in response: ',response);
                    this.loggedIn({state :false});
                }

            })
            .catch((error) => {
                console.log(error);
                this.loggedIn({state :false});
            })
    }

    login() {
        console.log('login click');
        this.gloginService.login()
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }


    winObj() {
        console.log(window.gapi);
    }
}

GapiLoginController.$inject = GapiLoginControllerInjectables;

export const GapiLoginComponent = {
    bindings:{
      loggedIn: '&'
    },
    template,
    controller: GapiLoginController
};