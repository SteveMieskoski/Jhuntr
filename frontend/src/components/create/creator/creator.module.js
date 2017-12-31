//import ngFileUpload from 'ng-file-upload';
//import 'ng-file-upload';
//import ngImgCrop from 'ng-img-crop-full-extended';


//Modules
//import { data } from '../../data-interface/data-interface.module.js';
import { creatorDisplay } from './creator-display/creator-display.module.js';
import { creatorDetailsEdit } from './creator-details-edit/creator-details-edit.module.js'
import { creatorStyleEdit } from './creator-style-edit/creator-style-edit.module.js';
import { creatorResList } from '../resume-listing/creator-listing.module.js'
import { creatorDownload } from './creator-download/download.module.js'
import { creatorViewPdf } from './creator-view-pdf/view-pdf.module.js'
import {imageUpload} from './creator-image-upload/image-upload.module.js'

//Setup
import {CreatorConfig} from "./creator.config.js";
import {creatorRun} from "./creator.run.js";
//Component Directives
import {creatorComponent} from "./creator.component.js";
import {creatorFormComponent} from "./creator-form.component.js";
//Constants
import {creatorOperationConstants} from "./constants/creator-operation.constants.js";
//Services
import {CreatorFactory} from "./creator.service.js";
import {CreatorUpdateFactory} from "./creator-update.service.js";
//Directives
import pageBreakDirective from "./utils/page-break.directive.js";
import pageLinkDirective from "./utils/page-link.directive.js";


export const creator = angular
    .module('creator', [
        //'monospaced.elastic',
            //AngularElastic,
      //  data,
        creatorDisplay,
        creatorDetailsEdit,
        creatorStyleEdit,
        creatorResList,
        creatorDownload,
        creatorViewPdf,
        imageUpload
    ])
    .config(CreatorConfig)
    .run(creatorRun)
    .constant('rootPath', 'src/components/create/creator')
    .constant('creatorRoutes', creatorOperationConstants.routes)
    .constant('paths', creatorOperationConstants.paths)
    .component('rescreator', creatorComponent)
    .component('creatorform', creatorFormComponent)
    .directive('pageBreak', pageBreakDirective)
    .directive('pageLink', pageLinkDirective)
    .service('CreatorFactory', CreatorFactory)
    .service('CreatorUpdateFactory', CreatorUpdateFactory)
    .name;
