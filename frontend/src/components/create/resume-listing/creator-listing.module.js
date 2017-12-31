import uiRouter from 'angular-ui-router';

import {EntryEditModule} from "./entry-edit/entry-edit.module.js";
import {AddPlaceholderModule} from "./add-placeholder/add-placeholder.module.js";
import {OtherSourceModule} from "./other-source/other-source.module.js";

import {listingComponent} from "./listing.component.js";
// require("./listing/res-thumbnail.directive.js";  //todo implement

export const creatorResList = angular
    .module('creator-res-list', [
        uiRouter,
        EntryEditModule,
        AddPlaceholderModule,
        OtherSourceModule
    ])
    .component('createlist', listingComponent)
    .name;