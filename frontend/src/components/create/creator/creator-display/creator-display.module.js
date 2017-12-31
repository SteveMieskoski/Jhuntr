import uiRouter from 'angular-ui-router';
import AngularElastic from '../../../../../node_modules/angular-elastic/elastic'

//import { data } from '../../../data-interface/data-interface.module.js'

import {creatorPopupConstants} from "./creator-popup.constants.js";
import {iconSelectConstants} from "./creator-icon-select.constants.js";
import {creatorDisplayComponent} from "./creator-display.component.js";
import {popTriggerDirective} from "./popovers/popup-trigger.directive.js";
import {CreatorDisplayPopoverService} from './popovers/popover.service.js';
import { CreatorDisplayService } from './creator-display.service.js';
//import { DisplayDataConnectorService } from './display-data-connector.service.js';
//import { DisplayTemplateService} from './display-template.service.js';
//import { PopupTemplateService} from './popovers/popup-template.service.js';
import {dataModelConstants} from "./data-model.constant.js";

export const creatorDisplay = angular
    .module('creator-display', [
        uiRouter,
        AngularElastic,
       // data
    ])
   // .run(run)
    .constant('popupUrls', creatorPopupConstants)
    .constant('iconList', iconSelectConstants)
    .constant('dataTemplate', dataModelConstants)
    .component('creatordisplay', creatorDisplayComponent)
    .directive('popTrigger', popTriggerDirective)
    .service('popService', CreatorDisplayPopoverService)
    .service('displayService', CreatorDisplayService)
    //.service('dataConnector', DisplayDataConnectorService)
    //.service('DisplayTemplateService', DisplayTemplateService)
   // .service('PopupTemplateService', PopupTemplateService)
    .name;