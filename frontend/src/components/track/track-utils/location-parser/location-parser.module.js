import {LocationParserService} from "./location-parser.service.js";
import {ParseGoogleService} from "./parse-google.service.js";
import{LocationRequestsService} from "./location-requests.service.js";
import {configFunc} from "./location-parser.config.js";

export const LocationParserModule = angular
	.module('LocationParserModule', [])
	.config(configFunc)
	.constant('locationDefault', {
        lat: null,
        long: null,
        address: null,
        number: null,
        street: null,
        city: null,
        region: null,
        state: null,
        country: null,
        zip: null
    })
	.service('LocationParserService', LocationParserService)
	.service('LocationRequestsService', LocationRequestsService)
	.service('ParseGoogleService', ParseGoogleService)
	.name;
