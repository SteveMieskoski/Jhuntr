"use strict";
//Modules
import { api } from '../../../api-interface/api.module.js';
// Component Directives
import {editorTopComponent} from "./editor-top.component.js";

export const editorTop = angular
    .module('editor-top', [
        'creator',
        'listor',
        api
    ])
    .component('editorTop', editorTopComponent)
    .name;

