import {transitionComponent} from "./transition.component.js";
import {TransFactory} from "./transition.service.js";


export const transition = angular
    .module('transition', [])
    .component('transition', transitionComponent)
    .service('TransFactory', TransFactory)
    .name;