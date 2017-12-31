//import ngFileUpload from 'ng-file-upload';
import 'ng-file-upload';
import 'ng-img-crop-full-extended';

import uiRouter from 'angular-ui-router';

import {imageUploadComponent} from "./image-upload.component.js";
import { ImageUploadService } from './image-upload.service.js';
import {ImageCropDirective} from "./cropple.directive.js";
import {ngThumbDirective} from "./image-preview.directive.js";

export const imageUpload = angular
    .module('creator-ImageUpload', [
        // ngFileUpload,
          'ngFileUpload',
        //    ngImgCrop,
         'ngImgCrop',
        uiRouter,
    ])
    .directive('imgCroppie', ImageCropDirective)
    .directive('ngThumb', ngThumbDirective)
    .component('imageupload', imageUploadComponent)
    .service('ImageUploadService', ImageUploadService)
    .name;