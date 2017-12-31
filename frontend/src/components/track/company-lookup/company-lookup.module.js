

import {configFunc} from "./company-lookup.config.js";
import {companyLookup} from './company-lookup.component.js';
import {CompanyLookupService} from "./company-lookup.service.js";
import {CompanyLookupGoogleService} from "./company-lookup-google.service.js";
import ngMap from 'ngmap';

export const companyLookupModule = angular
    .module('companyLookup', [
        ngMap
    ])
    .config(configFunc)
    .constant('apiKey', 'AIzaSyDaR25Eu2E2D7_2ykdaI5LSoPKJomx3dfE')
    .component('companyLookup', companyLookup)
    .service('companyLookupService', CompanyLookupService)
    .service('CompanyLookupGoogleService', CompanyLookupGoogleService)
    .name;

