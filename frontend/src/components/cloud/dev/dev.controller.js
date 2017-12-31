let DevControllerInjectables = ['$rootScope', 'store'];

export default class DevController{
    constructor($rootScope, store){
        this._$rootScope = $rootScope;
        this.store = store;
    }

    $onInit(){
        window.angular.element(this.loadComplete());


    }

    loadComplete() {
        this._$rootScope.$emit('navigationPageLoaded', 'CloudController');

    }

    demo(){
        let profile = JSON.parse(this.store.get('profile'));

        console.log(profile);
        let result = profile.user_id.match(/(^.*)\|/i)[1];
        console.log(result);
    }






}

DevController.$inject =  DevControllerInjectables;


