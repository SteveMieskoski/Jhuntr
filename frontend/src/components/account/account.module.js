
//import {companyLookupModule} from "./company-lookup/company-lookup.module.js";
import {utilities} from "../util/util.module.js";
import { api } from '../api-interface/api.module.js';
import {userAccount} from "./user-account/account.module.js";
import {tasks} from "./tasks/tasks.module.js";
import {reminders} from "./reminders/reminders.module.js";

export const accountModule = angular
    .module('accountModule', [
        api,
        utilities,
        userAccount,
        tasks,
        reminders
    ])
    .name;