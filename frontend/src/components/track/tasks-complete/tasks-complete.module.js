import {TasksCompleteComponent} from "./tasks-complete.component.js";
import {TasksCompleteService} from "./tasks-complete.service.js";


export const tasksCompleteModule = angular
	.module('tasksCompleteModule', [])
	.component('tasksComplete', TasksCompleteComponent)
	.service('TasksCompleteService', TasksCompleteService)
	.name;
