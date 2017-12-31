import uiRouter from 'angular-ui-router';

import {creatorSelectConstants} from "./creator-select.constants.js";
import {creatorInputComponent} from "./creator-input.component.js";
import {dataModelConstants} from "./data-model.constant.js";
import {CreatorInputService} from "./creator-input.service.js";


export const creatorDetailsEdit = angular
    .module('creator-details-edit', [
        uiRouter,
    ])
    .constant('selectOptions', creatorSelectConstants)
    .constant('dataTemplate', dataModelConstants)
    .component('creatorinput', creatorInputComponent)
    .service('CreatorInputService', CreatorInputService)
    .name;