import AngularStorage from 'angular-storage';

import {utilities} from '../util/util.module.js';
//import { data } from '../data-interface/data-interface.module.js'

import { CreatorDataFactory } from './creator-data.service.js';
import { EditorDataFactory } from './editor-data.service.js';
import {ListorDataFactory} from "./listor-data.service.js";
import {TasksDataFactory} from "./tasks-data.service.js";
import {AccountDataFactory} from "./account-data.service.js";
import { endPoints } from './end-points.constants.js';
import { ApiUtilities } from './api-utilities.service.js';
import { RemindersDataFactory}  from "./reminders-data.service.js";
import {CloudDataService} from './cloud-data.service.js';

import {AppStorageService} from "./app-storage.service.js";

export const api = angular
    .module('api', [
       // data,
        utilities,
        AngularStorage
    ])
    .constant('endPoints', endPoints)
    .service('CreatorDataFactory', CreatorDataFactory)
    .service('EditorDataFactory', EditorDataFactory)
    .service('ListorDataFactory', ListorDataFactory)
    .service('TasksDataFactory', TasksDataFactory)
    .service('AccountDataFactory', AccountDataFactory)
    .service('ApiUtilities', ApiUtilities)
	.service('RemindersDataFactory', RemindersDataFactory)
    .service('AppStorage', AppStorageService)
    .service('CloudDataService', CloudDataService)
    .name;

