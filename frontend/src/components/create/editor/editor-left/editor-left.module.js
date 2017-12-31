"use strict";
import { api } from '../../../api-interface/api.module.js';

import {editorLeftComponent} from "./editor-left.component.js";

export const editorLeft = angular
    .module('editor-left', [
        'creator',
        'listor',
        api
    ])
    .component('editorLeft', editorLeftComponent)
    .name;

