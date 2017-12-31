'use strict';

/**
 * Callback indicating the gapi library is available & bridge into the angular world. Since
 * this may be called before angular initializes, it may poll temporarily until the 2nd-stage
 * 'init_gapi' function is available.
 */

import {GapiService} from "./gapi-login.service.js";
import {GapiUtilService} from './gapi-util.service.js';
import {GapiLoginComponent} from "./gapi-login.component.js";
import {GapiConstants} from "./gapi.constants.js";
import {googleApiFactory} from "./googleApi.factory.js"
import {GapiRun} from "./gapi.run.js";



export const Gapi = angular
    .module('Gapi', [

    ])
    .run(GapiRun)
    .constant('gConstants', GapiConstants)
    .factory('googleApi', googleApiFactory)
    .service('gloginService', GapiService)
    .service('gUtil', GapiUtilService)
    .component('gLogin', GapiLoginComponent)
    .name;

/**
 * Adapter for exposing gapi as an angular service. This registers a promise that will
 * resolve to gapi after all the APIs have been loaded.

let GapiInjectables = ['$rootScope', '$window', '$q', 'apiKey', 'loadApis'];

export class Gapi{
    constructor($rootScope, $window, $q, apiKey, loadApis){

    }
}

Gapi.$inject = GapiInjectables;

 */
