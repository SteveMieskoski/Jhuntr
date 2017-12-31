
import {TaskUpdateComponent} from './task-update.component.js';
import {TaskUpdateService} from './task-update.service.js';

export const TaskUpdateModule = angular
    .module('taskUpdateModule', [])
    .component('taskUpdate', TaskUpdateComponent)
    .service('TaskUpdateService', TaskUpdateService)
    .name;