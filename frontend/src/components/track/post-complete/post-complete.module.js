

import {PostCompleteComponent} from "./post-complete.component.js";
import {PostCompleteService} from "./post-complete.service.js";
import {EditInPlaceComponent} from "./edit-inplace.component.js";
import {PostUpdateModule} from "../post-display/post-update/post-update.module.js";

export const PostCompleteModule = angular
	.module('postCompleteModule', [PostUpdateModule])
	.component('postComplete', PostCompleteComponent)
	.component('editInPlace', EditInPlaceComponent)
	.service('PostCompleteService', PostCompleteService)
	.name;
