import uiRouter from 'angular-ui-router';

import {downloadPdfComponent} from "./download-pdf.component.js";
import {DownloadPdfService} from "./download.service.js";

export const creatorDownload = angular
    .module('creator-DownloadPdf', [
        uiRouter,
    ])
    .component('downloadpdf', downloadPdfComponent)
    .service('DownloadPdfService', DownloadPdfService)
    .name;