import uiRouter from 'angular-ui-router';

import {viewPdfComponent} from "./view-pdf.component.js";
import { ViewPdfService } from "./view-pdf.service.js";

export const DropboxViewPdf = angular
    .module('dropboxViewPdf', [
        uiRouter,
    ])
    .component('dropboxViewpdf', viewPdfComponent)
    .service('ViewPdfService', ViewPdfService)
    .name;