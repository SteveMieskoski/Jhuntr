"use strict";
//Modules
import {selectOptions} from "../../../common/selection-constants/select-options.module.js";
import { api } from '../../api-interface/api.module.js';

//Setup
import {UserAccountConfig} from './account.config.js';
//Component Directives
import {userAccountComponent} from "./account.component.js";
//Services
import {UserFactory} from "./account.service.js";
//Constants
import {accountRoutes} from "./account.constants.js";

export const userAccount = angular
    .module('userAccount', [
        selectOptions,
        api
    ])
    .config(UserAccountConfig)
    .constant('accountRoutes', accountRoutes)
    .component('useraccount', userAccountComponent)
    .service('UserFactory', UserFactory)
    .name;




