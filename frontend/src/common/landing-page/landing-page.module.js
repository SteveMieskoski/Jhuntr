
import {appComponent} from "./landing-page.component.js";

export const landingPage = angular
    .module('landing-page', [])
    .component('app', appComponent)
    .name;