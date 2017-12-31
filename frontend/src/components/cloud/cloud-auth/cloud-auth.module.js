import { api } from '../../api-interface/api.module.js';


import {CloudAuthRun} from "./cloud-auth.run.js";
import {CloudAuthComponent} from "./cloud-auth.component.js";
import {CloudAuthService} from "./cloud-auth.service.js";
import {CloudAuth0} from "./cloud-auth0.service.js";
import {Gapi} from "../drive/gapi/gapi.module.js";


export const CloudAuthModule = angular
    .module('CloudAuthModule', [
        api,
        Gapi
    ])
    .run(CloudAuthRun)
    .component('cloudAuth', CloudAuthComponent)
    .service('CloudAuth0', CloudAuth0)
    .service('CloudAuthService', CloudAuthService)
    .name;
