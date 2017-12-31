

import {styleModalComponent} from "./editor-styles-modal.component.js";
import {itemsViewComponent} from "./editor-items-view.component.js";
import {importCoreComponent} from "./editor-import-core.component.js";

import {sliderComponent} from "./editor-slider.component.js";

export const editorItemDisplay = angular
    .module('editor-item-display', [

	])
    .component('allItemsModal', itemsViewComponent)
    .component('optionSlider', sliderComponent)
    .component('styleModal', styleModalComponent)
	.component('importCore', importCoreComponent)
    .name;