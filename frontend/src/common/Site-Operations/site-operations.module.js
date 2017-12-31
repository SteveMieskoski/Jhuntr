'use strict';

import { api } from '../../components/api-interface/api.module.js';

import {SiteOperationsConfig} from "./site-operations.config.js";
import {supportComponent} from "./support/support.component.js";
import {issuesComponent} from "./support/issues.component.js";
import {helpComponent} from "./support/help.component.js";
import {contactComponent} from "./contact/contact.component.js";
import {disclaimerComponent} from "./beta-disclaimer/disclaimer.component.js";
import {SiteOperationsDataFactory} from "./site-operations-data.service.js";
import {opsConstants} from "./site-operations.constant.js";


export const siteOperations = angular
    .module('siteOperations', [
        api
    ])
    .config(SiteOperationsConfig)
    .constant('opsConstants', opsConstants)
    .component('help', helpComponent)
    .component('issues', issuesComponent)
    .component('support', supportComponent)
    .component('contact', contactComponent)
    .component('disclaimer', disclaimerComponent)
    .service('SiteOperationsDataFactory', SiteOperationsDataFactory)
    .name;
