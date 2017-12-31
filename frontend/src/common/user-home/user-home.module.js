
import { api } from '../../components/api-interface/api.module.js';
import {tasks} from "../../components/account/tasks/tasks.module.js";

import {userHomeComponent} from "./user-home.component.js";
import {UserHomeService} from "./user-home.service.js";
import {userHomeConfig} from './user-home.config.js';
import {userHomeRun} from './user-home.run.js';
import { postDisplay} from '../../components/track/post-display/post-display.module.js';

export const userHome = angular
    .module('user-home', [
        api,
        tasks,
        postDisplay
    ])
    .config(userHomeConfig)
    .run(userHomeRun)
    .component('userhome', userHomeComponent)
    .service('UserHomeService', UserHomeService)
    .name;