// Dependency Imports
// Core Angular
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import AngularAnimate from 'angular-animate';
import AngularSanitize from 'angular-sanitize';
// Angular Ui Bootstrap Modules
//import AngularUiBootstrap from 'angular-ui-bootstrap';
import AngularUiModal from 'angular-ui-bootstrap/src/modal';
import AngularUiPopover from 'angular-ui-bootstrap/src/popover';
import AngularUiDropDown from 'angular-ui-bootstrap/src/dropdown';
import AngularUiDatePicker from 'angular-ui-bootstrap/src/datepicker';
import AngularUiDatePickerPopup from 'angular-ui-bootstrap/src/datepickerPopup';
import AngularUiDateparser from 'angular-ui-bootstrap/src/dateparser'
import AngularUiTabs from 'angular-ui-bootstrap/src/tabs';
import AngularUiTooltip from 'angular-ui-bootstrap/src/tooltip';
import AngularUiTypeAhead from 'angular-ui-bootstrap/src/typeahead';
import AngularUiCollapse from 'angular-ui-bootstrap/src/collapse';
//import AngularMaterial from 'angular-material';
// Additional 3rd party modules
import AngularStorage from 'angular-storage';
import AngularCookies from 'angular-cookies';
import AngularJWT from 'angular-jwt';
import angularDragula from 'angular-dragula';
import 'auth0-js';
import auth0 from 'angular-auth0';
import pleaseWait from "../node_modules/please-wait/build/please-wait.min.js";


// Style Imports (for Webpack bundling)
import '../styles/scss/main.scss';
import '../styles/scss/res-templates/core/core.scss';
import"../vendor/bootstrap.css";

//import"../node_modules/please-wait/build/please-wait.css";
import"../vendor/font-awesome-4.7.0/css/font-awesome.min.css";
//import"../node_modules/angular-material/angular-material.min.css";
import"../node_modules/angular-dragula/dist/dragula.min.css";
import '../vendor/fine-uploader/fine-uploader-gallery.css';
import "../node_modules/croppie/croppie.css";
//import "../vendor/3-wave.css";

// App Core Modules
import {components} from"./components/components.module.js";
import {common} from "./common/common.module.js";

//Root Module Setup
import {configFunc} from "./root.config.js";
import {run} from "./root.run.js";

// Root Services
import {RootController} from"./root.controller.js";
import {RootHostService} from "./root-host.service.js";
import {CloudModule} from "./components/cloud/cloud.module.js";


// General Utilities
import {toArrayFilter} from './components/util/angular-toArrayFilter.js';


window.pleaseWait = pleaseWait;

export const root = angular
    .module('root', [
        // External Dependencies
        angularDragula(angular),
        auth0,
        AngularJWT,
        AngularCookies,
        AngularStorage,
        uiRouter,
        //AngularMaterial,
        //AngularUiBootstrap,
        AngularUiModal,
        AngularUiPopover,
        AngularUiDropDown,
        AngularUiTabs,
        AngularUiTooltip,
        AngularUiDatePicker,
        AngularUiDatePickerPopup,
        AngularUiDateparser,
        AngularUiTypeAhead,
        AngularUiCollapse,
        AngularAnimate,
        AngularSanitize,
        // App Core Modules
        components,
        common,
        CloudModule,
        toArrayFilter
    ])
    .config(configFunc)
    .run(run)
    .controller('RootController', RootController)
    .service('host', RootHostService)
    .name;



