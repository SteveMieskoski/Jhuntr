
import { api } from '../api-interface/api.module.js';

import {CloudConfig} from "./cloud.config.js";
import {CloudComponent} from "./cloud.component.js";
import {CloudService} from "./cloud.service.js";

import {dropboxModule} from "./dropbox/dropbox.module.js";
import {DriveModule} from "./drive/drive.module.js";
import {CloudAuthModule} from "./cloud-auth/cloud-auth.module.js";

import {DevModule} from "./dev/dev.module.js";

export const CloudModule = angular
    .module('CloudModule', [
        api,
        dropboxModule,
        DriveModule,
      //  CloudAuthModule,
        DevModule
    ])
    .config(CloudConfig)
    .component('cloudcomponent', CloudComponent)
    .service('CloudService', CloudService)
    .name;
