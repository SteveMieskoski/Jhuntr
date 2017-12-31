"use strict";


//import { creator } from '../creator/creator.module.js';

import {editorLeft} from "./editor-left/editor-left.module.js";
import {editorRight} from "./editor-right/editor-right.module.js";
import {editorTop} from "./editor-top/editor-top.module.js";
import {editorListor} from "./editor-listor/editor-listor.module.js";
import {editorItemDisplay} from "./editor-item-display/editor-item-display.module.js";
import 'angular-moment';
// Setup
import {EditorConfig} from './editor.config.js';
// Component Directives
import {editorComponent} from "./editor.component.js";
//Services
import {EditorFactory} from "./editor.service.js";
//Constants
import {editorRoutes, editorPaths} from "./editor-config.constants.js";
import {editorDataModel} from "./editor-view.constants.js"


export const editor = angular
    .module('editor', [
        'angularMoment',
     //   api,
     //   creator,
     //   listor,
        editorLeft,
        editorRight,
        editorTop,
        editorListor,
        editorItemDisplay
    ])
    .config(EditorConfig)
    .constant('coreViewDetails', editorDataModel)
    .constant('editorRoutes', editorRoutes)
    .constant('paths', editorPaths)
    .component('editorMain', editorComponent)
    .service('EditorFactory', EditorFactory)
    .name;

