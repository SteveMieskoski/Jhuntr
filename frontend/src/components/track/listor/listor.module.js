

//Modules
import {tasks} from "../../account/tasks/tasks.module.js";
import {listorItemUpload} from "./listor-item-upload/listor-item-upload.module.js";
import { api } from '../../api-interface/api.module.js';
import { postDisplay} from '../post-display/post-display.module.js';
import {GridModule} from "./grid/grid.module.js";

//Component Directives
import {listorComponent} from "./listor.component.js";
import { ListorEmptyComponent } from './listor-empty.component.js';
//Services
import {ListorFactory} from "./listor.service.js";
//Constants
import {listorConfigConstants} from "./listor-config.constants.js";


export const listor = angular
    .module('listor', [
        api,
		listorItemUpload,
        tasks,
        postDisplay,
        GridModule
    ])
    .constant('listorRoutes', listorConfigConstants.routes)
    .constant('paths', listorConfigConstants.paths)
    .component('listorList', listorComponent)
    .component('listorEmpty', ListorEmptyComponent)
    .service('ListorFactory', ListorFactory)
    .name;




