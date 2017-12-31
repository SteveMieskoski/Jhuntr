
import{countries} from "./countries.js";
import{USAstates} from "./USA-states.js";
import{USAstatebounds} from "./USA-state-bounds.js"
import{USAcities} from "./USA-cities.js";

export const utilConstants = angular
    .module('utilConstants', [])
    .constant('countries', countries)
    .constant('usaStates', USAstates)
    .constant('usaStateBounds', USAstatebounds)
    .constant('usaCities', USAcities)
    .name;