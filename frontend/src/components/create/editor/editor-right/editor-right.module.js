"use strict";

// Modules
import { api } from '../../../api-interface/api.module.js';
// Component Directives
import {editorRightComponent} from "./editor-right.component.js";
//Directives

export const editorRight = angular
    .module('editor-right', [
        'creator',
        'listor',
        api
    ])
    .component('editorRight', editorRightComponent)
    .name;

