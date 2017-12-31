'use strict';

//Modules
import { api } from '../../api-interface/api.module.js';
//Component Directives
import {reminderListComponent} from "./reminders.component.js";
import {remindersModalComponent} from "./reminders-modal.component.js";

export const reminders = angular
    .module('reminders', [
    	api
	])
    .component('reminderList', reminderListComponent)
    .component('remindersModal', remindersModalComponent)
	.name;




