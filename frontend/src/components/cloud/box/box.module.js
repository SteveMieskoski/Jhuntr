
import {BoxComponent} from "./box.component.js";

import {BoxService} from "./box.service.js";

export const BoxModule = angular
    .module('BoxModule', [
    ])
    .component('boxcomponent', BoxComponent)
    .service('BoxService', BoxService)
    .name;
