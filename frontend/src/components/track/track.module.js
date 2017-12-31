
import 'angular-moment';

import { api } from '../api-interface/api.module.js';
import {Gapi} from "../cloud/drive/gapi/gapi.module.js";


import {companyLookupModule} from "./company-lookup/company-lookup.module.js";
import {utilities} from "../util/util.module.js";
import { listor } from './listor/listor.module.js';
import {postDisplay} from "./post-display/post-display.module.js";
import {tasksCompleteModule} from "./tasks-complete/tasks-complete.module.js";
import {PostCompleteModule} from "./post-complete/post-complete.module.js";
import {mapModule} from "./map/map.module.js";
import {TrackUtilsModule} from "./track-utils/track-utils.module.js";
import {TrackConfig} from "./track.config.js";


export const trackModule = angular
    .module('trackModule', [
        'angularMoment',
        api,
        Gapi,
        mapModule,
        companyLookupModule,
        listor,
        postDisplay,
        utilities,
        tasksCompleteModule,
        PostCompleteModule,
        TrackUtilsModule
    ])
    .config(TrackConfig)
    .name;