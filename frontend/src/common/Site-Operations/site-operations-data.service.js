let SiteOperationsDataFactoryInjectables = ['$http', 'host', 'opsConstants'];


export class SiteOperationsDataFactory {
    constructor($http, host, opsConstants){
        'ngInject';
        this.$http = $http;
        this.host = host;
        this.opsConstants = opsConstants;
    }

    emailSender(data, route) {
        return this.$http.post(this.host() + this.opsConstants.routes.sendEmail + route, data)
            .then((response) => {
                return response;
            })
    }

}


SiteOperationsDataFactory.$inject = SiteOperationsDataFactoryInjectables;