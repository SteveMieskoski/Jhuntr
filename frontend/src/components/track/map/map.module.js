
import ngMap from 'ngmap';

import {MapComponent} from "./map.component.js";
import {GoogleMapService} from "./map.service.js";
import {mapConfigFunc} from "./map.config.js";


export const mapModule = angular
    .module('mapModule', [
        ngMap
    ])
    .config(mapConfigFunc)
    .constant('apiKey', 'AIzaSyDaR25Eu2E2D7_2ykdaI5LSoPKJomx3dfE')
    .component("googleMaps", MapComponent)
    .service('MapService', GoogleMapService)
    .name;