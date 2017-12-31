import uiRouter from 'angular-ui-router';

import {viewPdfComponent} from "./view-pdf.component.js";
import { ViewPdfService } from "./view-pdf.service.js";

export const creatorViewPdf = angular
    .module('creator-viewPdf', [
        uiRouter,
    ])
    .component('viewpdf', viewPdfComponent)
    .service('ViewPdfService', ViewPdfService)
    .name;