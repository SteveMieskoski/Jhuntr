import {DropboxViewPdf} from './view/view-pdf.module.js';

import {DropboxComponent} from "./dropbox.component.js";
import {DropboxLoginComponent} from "./login.component.js";
import {DropboxUIComponent} from "./dropbox-ui.component.js";
import {DropboxService} from "./dropbox.service.js";
import {DropboxRun} from "./dropbox.run.js";

export const dropboxModule = angular
    .module('dropboxModule', [DropboxViewPdf])
    .run(DropboxRun)
    .component('dropbox', DropboxComponent)
    .component('dropboxLogin', DropboxLoginComponent)
    .component('dropboxUi', DropboxUIComponent)
    .service('DropboxService', DropboxService)
    .name;
