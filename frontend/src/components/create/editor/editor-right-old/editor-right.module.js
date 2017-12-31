"use strict";

// Modules
//import { api } from '../../api-interface/api.module.js';
// Component Directives
//import {editorRightComponent} from "./editor-right.component.js";
//import {cropComponent} from "./editor-crop.component.js";
//Directives
//import {EditorCropperDirective} from "./editor-croppie.directive.js";

export const editorRight = angular
    .module('editor-right-old', [
        'creator',
        'listor',
        api
    ])
  //  .component('editorRight', editorRightComponent)
   // .component('editorCrop', cropComponent)
   // .directive('croppieEdit', EditorCropperDirective)
    .name;

