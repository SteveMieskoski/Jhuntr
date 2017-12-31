let CloudControllerInjectables = ['$rootScope', 'store', '$window', 'AppStorage'];

export default class CloudController{
    constructor($rootScope, store, $window, AppStorage){
    this._$rootScope = $rootScope;
    this._store = store;
    this._window = $window;
    this._shelf = AppStorage;

    this.cloudService = 'choose';
        this.rememberMe = false;
    }

    $onInit(){
        window.angular.element(this.loadComplete());
        this.checkIfRemembered();
    }

    loadComplete() {
        this._$rootScope.$emit('navigationPageLoaded', 'CloudController');
    }

    checkIfRemembered(){
        let provider = this._store.get('cloud_provider');
        if(provider){
            this.chooseCloudService(provider);
        } else {
           let currentCloud = this._shelf.get('current_cloud');
            if(currentCloud){
                this.chooseCloudService(currentCloud);
            }
        }
    }

    chooseCloudService(value){
        this.cloudService = value;
        this._shelf.set('current_cloud', value);
   //     this._window.sessionStorage.setItem('current_cloud', value);
        this.rememberChoice(this.rememberMe, value)
    }

    rememberChoice(value, provider){
        if(value){
            this._store.set('cloud_provider', provider);
        }
    }

}

CloudController.$inject =  CloudControllerInjectables;