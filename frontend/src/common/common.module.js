//import {tasks} from "../components/tasks/tasks.module.js";

import { selectOptions } from "../common/selection-constants/select-options.module.js";
import {siteOperations} from "../common/Site-Operations/site-operations.module.js";
import {authentication} from "../common/Authentication/auth.module.js";
//import { api } from '../components/api-interface/api.module.js';
import {userHome} from './user-home/user-home.module.js';
import {landingPage} from './landing-page/landing-page.module.js';
import {navigation} from './navigation/navigation.module.js';
import {transition} from './transitions/transition.module.js';

import {introComponent} from "./user-home/into.component.js";



export const common = angular
    .module('common', [
        authentication,
        //  'angular-jwt',
        // 'ui.router',
        // 'ui.bootstrap',
        //   'ngAnimate',
        siteOperations,
        selectOptions,
     //   tasks,
     //   api,
        userHome,
        landingPage,
        navigation,
        transition
    ])

    .component('into', introComponent)  //todo fix typo
    .name;




