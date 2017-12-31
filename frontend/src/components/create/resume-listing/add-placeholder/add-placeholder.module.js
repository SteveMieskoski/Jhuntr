import {AddPlaceholderComponent} from "./add-placeholder.component.js";


export const AddPlaceholderModule = angular
	.module('AddPlaceholderModule', [])
	.component('addPlaceholder', AddPlaceholderComponent)
	.name;
