import {OtherSourceComponent} from "./other-source.component.js";


export const OtherSourceModule = angular
	.module('OtherSourceModule', [])
	.component('otherSource', OtherSourceComponent)
	.name;
