gridRun.$inject = ['$templateCache'];

export function gridRun($templateCache) {
    $templateCache.put('ui-grid/date-cell',
        "<div class='ui-grid-cell-contents'>{{COL_FIELD | date:'yyyy-MM-dd'}}</div>"
    );

    // Custom template using Bootstrap DatePickerPopup
    // Custom template using Bootstrap DatePickerPopup
    $templateCache.put('ui-grid/ui-grid-date-filter',
        `<div class=\"ui-grid-filter-container input-group input-group-sm\" ng-repeat=\"colFilter in col.filters\" >
        <input type=\"text\" uib-datepicker-popup=\"{{datePicker.format}}\" 
       datepicker-options=\"datePicker.options\" 
       datepicker-append-to-body=\"true\" 
       show-button-bar=\"false\"
       is-open=\"showDatePopup[$index].opened\" 
       class=\"ui-grid-filter-input ui-grid-filter-input-{{$index}} form-control\"
       ng-model=\"colFilter.term\" 
       ng-attr-placeholder=\"{{colFilter.placeholder || ''}}\" 
        aria-label=\"{{colFilter.ariaLabel || aria.defaultFilterLabel}}\" />

       <span class=\"input-group-btn\" >
       <button type=\"button\" 
       class=\"btn btn-default btn-sm\" 
       ng-click=\"showDatePopup[$index].opened = true\">
       <i class=\"glyphicon glyphicon-calendar\"></i>
       </button>
      
      
       <button role=\"button\" 
       class=\" btn btn-default btn-sm\" 
       ng-click=\"removeFilter(colFilter, $index)\" 
       ng-if=\"!colFilter.disableCancelFilterButton\" 
       ng-disabled=\"colFilter.term === undefined || colFilter.term === null || colFilter.term === ''\" 
       ng-show=\"colFilter.term !== undefined && colFilter.term !== null && colFilter.term !== ''\">
       <i class=\"fa fa-times\" 
       ui-grid-one-bind-aria-label=\"aria.removeFilter\">
       </i>
       </button>
        </span>
        </div>
       <div ng-if=\"colFilter.type === 'select'\">
       <select class=\"ui-grid-filter-select ui-grid-filter-input-{{$index}}\" ng-model=\"colFilter.term\" ng-attr-placeholder=\"{{colFilter.placeholder || aria.defaultFilterLabel}}\" aria-label=\"{{colFilter.ariaLabel || ''}}\" ng-options=\"option.value as option.label for option in colFilter.selectOptions\">
       <option value=\"\"></option>
       </select>
       <div role=\"button\" class=\"ui-grid-filter-button-select\" ng-click=\"removeFilter(colFilter, $index)\" ng-if=\"!colFilter.disableCancelFilterButton\" ng-disabled=\"colFilter.term === undefined || colFilter.term === null || colFilter.term === ''\" ng-show=\"colFilter.term !== undefined && colFilter.term != null\">
       <i class=\"ui-grid-icon-cancel\" ui-grid-one-bind-aria-label=\"aria.removeFilter\">&nbsp;</i>
       </div>
       </div>`
    );
}


/*
 <div class="row">
 <div class="col-md-9">

 </div>
 <div class="col-md-3">

 </div>
 </div>
 */