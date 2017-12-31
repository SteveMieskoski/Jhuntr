//Modules
import { api } from '../../api-interface/api.module.js';
//Component Directives
import {tasksComponent} from "./tasks.component.js";

export const tasks = angular
    .module('tasks', [
    	api
	])
    .component('taskList', tasksComponent)
    .name;



