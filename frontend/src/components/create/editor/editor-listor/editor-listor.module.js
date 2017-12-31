import { editorResListorComponent } from './editor-res-list.component.js';

export const editorListor = angular
    .module('editor-listor', [])
    .component('resListor', editorResListorComponent)

    .name;