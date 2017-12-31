


import {postUpdateModalComponent} from "./post-update.component.js";
import {ListResumesComponent} from './list-resumes.component.js';
import {PostUpdateService} from './post-update.service.js';

export const PostUpdateModule = angular
    .module('PostUpdateModule', [])
    .component('plainPostUpdateModal', postUpdateModalComponent)
    .component('listResumes', ListResumesComponent)
    .service('PostUpdateService', PostUpdateService)
    .name;