import 'angular-ui-grid';

import {GridComponent} from "./grid.component.js";
import {GridService} from "./grid.service.js";
import {TableService} from "./table-columns.service.js";
import {ColumnSelectComponent} from "./column-select.component.js";

import {gridRun} from "./grid.run.js";

export const GridModule = angular
	.module('GridModule', [
        'ui.grid',
        'ui.grid.autoResize',
        'ui.grid.resizeColumns',
        'ui.grid.selection',
        'ui.grid.edit'
    ])
    .run(gridRun)
	.component('gridDisplay', GridComponent)
    .component('columnSelect', ColumnSelectComponent)

	.service('GridService', GridService)
    .service('GridColumns', TableService)
	.name;
