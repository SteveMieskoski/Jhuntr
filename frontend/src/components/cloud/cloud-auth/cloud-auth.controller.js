let CloudAuthControllerInjectables = ['$rootScope', 'CloudAuthService'];

export default class CloudAuthController{
    constructor($rootScope, CloudAuthService){
    this._$rootScope = $rootScope;
    this._service = CloudAuthService;
    this._gapi = window.gapi;
    }

    $onInit(){
        window.angular.element(this.loadComplete());

    }

    loadComplete() {
        this._$rootScope.$emit('navigationPageLoaded', 'CloudController');
    }

    demo(){
    }

    checkAuth(){

    }

    auth0RequestAuth(){
        this._$rootScope.authorizingCloud = true;
        this._service.googleLogin()
            .then((response) => {
            console.log('CloudAuth-Service Response', response);
            })
            .catch((err) => {
            console.log('CloudAuth-Service Error', err);
            })
    }




}

CloudAuthController.$inject =  CloudAuthControllerInjectables;