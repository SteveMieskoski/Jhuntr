import {UtilFactory} from "./util.service.js";
import {ExceptionFactory} from "./util-error_Handle.service.js";
import {utilConfigConstants} from "./util-config.constants.js";
import {LodashFactory} from "./lodash.service.js";
import {ErrorFactory} from "./util-error.service.js";
import {GeneralFactory} from "./util-general.service.js";
import {dataPickerModal} from "./date-picker-modal/date-picker-modal.module.js";
import {toArrayFilter} from "./angular-toArrayFilter";
import {FuzzySearchService, fuzzy} from "./fuzzy-search.service.js";
import {utilConstants} from "./constants/constants.module.js";
import {validation} from "./validation.directive.js";

export const utilities = angular
    .module('utilities', [
        utilConstants,
        dataPickerModal,
        toArrayFilter
    ])
    .constant('utilConfig', utilConfigConstants)
    .directive('checkValidation', validation)
    .service('LoDash', LodashFactory)
    .service('UtilErrorFactory', ErrorFactory)
    .service('exceptionHandler', ExceptionFactory)
    .service('UtilFactory', UtilFactory)
    .service('GeneralFactory', GeneralFactory)
    .service('FuzzySearch', FuzzySearchService)
    .filter('fuzzy', fuzzy)
    .name;




