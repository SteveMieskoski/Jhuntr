let GapiUtilServiceInjectables = ['googleApi', 'gConstants', '$timeout'];

export class GapiUtilService {
    constructor(googleApi, gConstants, $timeout) {
        this._googleApi = googleApi;
        this._gConstants = gConstants;
        this._$timeout = $timeout;
    }


}


GapiUtilService.$inject = GapiUtilServiceInjectables;