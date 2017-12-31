
import {TaskAddComponent} from './task-add.component.js';
import {TaskAddService} from './task-add.service.js';

export const TaskAddModule = angular
    .module('taskAddModule', [])
    .component('taskAdd', TaskAddComponent)
    .service('TaskAddService', TaskAddService)
    .name;