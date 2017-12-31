import template from'./editor-slider.component.html';
import controller from './editor-slider.controller.js';

export const sliderComponent = {
	require: {
		editorMain: '^^editorMain'
	},
	bindings: {
		showSlideIn: '<',
		closeSlider: '&',
		displaySection: '='
	},
	template,
	controller
}


