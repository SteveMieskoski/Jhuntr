import {PostCompleteComponent} from "./post-complete.component.js";
import {PostCompleteService} from "./post-complete.service.js";


export const PostCompleteModule = angular
	.module('postCompleteModule', [])
	.component('postComplete', PostCompleteComponent)
	.service('PostCompleteService', PostCompleteService)
	.name;
