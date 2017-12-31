

import {DevComponent} from "./dev.component.js";
import {DevService} from "./dev.service.js";
import {Gapi} from "../drive/gapi/gapi.module.js";


export const DevModule = angular
    .module('DevModule', [
        Gapi
    ])
    .component('devcomponent', DevComponent)
    .component('devDrive', DevComponent)
    .service('DevService', DevService)
    .name;
