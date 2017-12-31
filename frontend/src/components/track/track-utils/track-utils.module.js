
import {LocationParserModule} from "./location-parser/location-parser.module.js";

export const TrackUtilsModule = angular
	.module('TrackUtilsModule', [
        LocationParserModule
    ])
	.name;
