import { api } from '../../components/api-interface/api.module.js';
import {authentication} from "../Authentication/auth.module.js";

import {footerShowDirective} from "./footer.directive.js";
import {targetWindow} from "./targetWindow.directive.js";
import {navComponent} from "./app-navbar.component.js";
import {footerComponent} from "./footer.component.js";

export const navigation = angular
    .module('navigation', [
        api,
        authentication
    ])
    .directive('footerShow', footerShowDirective)
    .directive('targetWindow', targetWindow)
    .component('bottomfooter', footerComponent)
    .component('navbar', navComponent)
    .name;