import uiRouter from 'angular-ui-router';

import {creatorOptionsConstants} from "./creator-option.constants.js";
import {creatorStyleComponent} from "./creator-styles.component.js";
import {CreatorFeaturesFactory} from "./creator-features.service.js";
import { StyleEditingService } from './style-editing.service.js'

import {styleBackgroundsConstants} from './style-constants/style-backgrounds.constants.js';
import {styleColorsConstants} from './style-constants/style-colors.constants.js';
import {styleFontsConstants} from './style-constants/style-fonts.constants.js';
import {styleSectionsConstants} from './style-constants/style-sections.constants.js';
//import run from './creator-style.runConfig.js';


export const creatorStyleEdit = angular
    .module('creator-style-edit', [
        uiRouter,
    ])
   // .run(run)
    .constant('styleBackgroundsConstants',styleBackgroundsConstants)
    .constant('styleColorsConstants',styleColorsConstants)
	.constant('styleFontsConstants',styleFontsConstants)
	.constant('styleSectionsConstants',styleSectionsConstants)
    .constant('featureConstants', creatorOptionsConstants)
    .component('creatorstyles', creatorStyleComponent)
    .service('CreatorFeaturesFactory', CreatorFeaturesFactory)
    .service('StyleService', StyleEditingService)
    .name;