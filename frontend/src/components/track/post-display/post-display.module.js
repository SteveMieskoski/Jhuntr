
//import { api } from '../../api-interface/api.module.js';
//import {tasks} from "../../account/tasks/tasks.module.js";

import {PostCompleteModule} from "../post-complete/post-complete.module.js";

import {companyLookupModule} from "../company-lookup/company-lookup.module.js";

import {TaskHandlerModule} from "./task-handlers/task-handler.module.js";
import {PostUpdateModule} from "./post-update/post-update.module.js";

import {postListComponent} from "./post-list.component.js";
import {postDisplayComponent} from "./post-display.component.js";
import {postDetailsModalComponent} from "./post-details.component.js";

import {PostDisplayService} from "./post-display.service.js";
import {addPostModalComponent} from "./add-post.component.js";
import {statusLabelChangeComponent} from "./status-label-change.component.js";



// user-file-upload Directory

export const postDisplay = angular
    .module('post-display', [
      //  UserFileUpload,
      //  api,
        companyLookupModule,
      //  tasks,
        TaskHandlerModule,
        PostUpdateModule
    ])
   // .component('postdisplay', postDisplayComponent)
    .component('postlist', postListComponent)
    .component('addPostModal', addPostModalComponent)
    .component('viewPostDetailsModal', postDetailsModalComponent)
    .component('statusLabelChange', statusLabelChangeComponent)
    .service('PostDisplayService', PostDisplayService)
    .name;