
import {utilities} from "./util/util.module.js";
import {createModule} from "./create/create.module.js";
import {trackModule} from "./track/track.module.js";
import {CloudModule} from "./cloud/cloud.module.js";
import {accountModule} from "./account/account.module.js";

import {componentPaths, componentRoutes} from "./components.constants.js";


export const components = angular
    .module('components', [
        accountModule,
        createModule,
        trackModule,
        utilities,
        CloudModule
    ])
    .constant('compRoutes', componentRoutes)
    .constant('paths', componentPaths)
    .name;