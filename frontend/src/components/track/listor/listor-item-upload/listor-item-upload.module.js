
//import { api } from '../../api-interface/api.module.js';
import {ItemUploadService} from './item-upload.service.js';
import { itemUploadComponent } from './item-upload.component.js';
import {fineUploaderDirective} from './fine-uploader.directive.js';
import { itemUploadPageComponent} from './item-upload-page.component.js';
import { itemUploadPdfComponent} from './item-upload-pdf.component.js';

export const listorItemUpload = angular
	.module('listorItemUpload', [
		//api,
	])
	.directive("fineUploader", fineUploaderDirective)
	.component('itemUploader', itemUploadComponent)
	//.controller('uploadPageController', ItemUploadController)
	.component('itemUploadPage', itemUploadPageComponent)
	.component('itemUploadPdfPage', itemUploadPdfComponent)
	.service('ItemUploadService', ItemUploadService)
	.name;




