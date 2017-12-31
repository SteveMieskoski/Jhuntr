let BoxControllerInjectables = ['$rootScope'];

export default class BoxController{
    constructor($rootScope){
    this._$rootScope = $rootScope;
    }

    $onInit(){
        window.angular.element(this.loadComplete());
    }

    loadComplete() {
        this._$rootScope.$emit('navigationPageLoaded', 'CloudController');
    }

}

BoxController.$inject =  BoxControllerInjectables;