let GeneralFactoryInjectables = ['$rootScope', 'jwtHelper', 'store', '$location'];


export class GeneralFactory {
    constructor($rootScope, jwtHelper, store, $location){
        'ngInject';
        this.$rootScope = $rootScope;
        this.jwtHelper = jwtHelper;
        this.store = store;
        this.$location = $location;
    }

     emitPayload(event, payload) {
		 this.$rootScope.$emit(event, payload);
    };

    host() {
        let protocol = this.$location.protocol();
        let host = this.$location.host();
        let port = this.$location.port();
        if (!port) {
            return protocol + '://' + host;
        } else {
            return protocol + '://' + host + ':' + port;
        }
    }

}


GeneralFactory.$inject = GeneralFactoryInjectables;