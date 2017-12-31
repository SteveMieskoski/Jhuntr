

import {DriveComponent} from "./drive.component.js";
import {DriveService} from "./drive.service.js";
import {Gapi} from "./gapi/gapi.module.js";


export const DriveModule = angular
    .module('DriveModule', [
        Gapi
    ])
    .component('gdrive', DriveComponent)
    .service('DriveService', DriveService)
    .name;
