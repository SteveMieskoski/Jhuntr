
import {TaskUpdateModule} from "./task-update/task-update.module.js";
import {TaskAddModule} from "./task-add/task-add.module.js";

import {TaskHandlerComponent} from './task-handler.component.js';
import {TaskHandlerService} from './task-handler.service.js';

export const TaskHandlerModule = angular
    .module('taskHandlerModule', [
        TaskAddModule,
        TaskUpdateModule
    ])
    .component('taskhandler', TaskHandlerComponent)
    .service('TaskHandlerService', TaskHandlerService)
    .name;