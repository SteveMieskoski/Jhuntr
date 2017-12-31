import linkIcon from  "../../../../assets/icons/external-link.svg";
import editIcon from "../../../../assets/icons/sketch-pencil.svg";

let GridControllerInjectables = ['$scope', 'ListorDataFactory', 'GridService', '$rootScope', 'uiGridConstants', '$timeout', '$state', 'store', 'GridColumns'];

export default class GridController {
    constructor($scope, ListorDataFactory, GridService, $rootScope, uiGridConstants, $timeout, $state, store, GridColumns) {
        'ngInject';
        this.ListorDataFactory = ListorDataFactory;
        this.ListorFactory = GridService;
        this.$rootScope = $rootScope;
        this.uiGridConstants = uiGridConstants;
        this.GridColumns = GridColumns;
        this.$timeout = $timeout;
        this.$state = $state;
        this.store = store;
        this.$scope = $scope;

        this.$rootScope.$on('updateData', () => {
            this.gridOptions.data = this.getData();
        });
    }

    $onInit() {
        this.setup();
        window.angular.element(this.pageLoadComplete());
    };

    pageLoadComplete() {
        this.$rootScope.$emit('navigationPageLoaded', 'GridController');
    }

    /**
     * ================= Temp Demos/Dev =========================================
     */

   // durationPick(){
   //     this.GridColumns.datePicker();
  //  }

    /**
     * =======================  SETUP METHODS ===============================
     */
    setup(){
        console.log('KEY VALUE:', String.fromCodePoint(32) );
        console.log(this.postListing);
        console.log(this.uiGridConstants.GREATER_THAN);
        this.statusObject = this.buildStatusList(this.postListing);
        this.statuses = this.statusObject.statuses;
        this.stateList = this.buildStateList(this.postListing);
        let gridLength = this.postListing.length;
        console.log('gridLength', gridLength);
        if (gridLength < 3) gridLength = 4;
        this.gridSize = {height: ((gridLength * 41) + 61) + 'px'};
        console.log('gridSize', this.gridSize);
        this.gridOptions = this.gridSetup();

        this.prepareGridColumns({status: this.statusObject.statusOptions, states: this.stateList })
            .then((columnResponse) => {
                this.columns = columnResponse;
                this.gridOptions.columnDefs = columnResponse;
            })
            .catch((error) => {
                console.log('prepare columns error', error);
            });
    }



    gridSetup(){
        return {
            enableFiltering: false,
            enableSorting: true,
            data: this.postListing,
            enableGridMenu: true,
            enableColumnResize: true,
            gridMenuCustomItems: this.prepareGridMenu(),
            onRegisterApi: (gridApi) => {
                this.gridRegisterApi(gridApi);
            }
        };
    }

    gridRegisterApi(gridApi) {
        this.gridApi = gridApi;
        gridApi.edit.on.afterCellEdit(this.$scope, (rowEntity, colDef, newValue, oldValue) => {
            if (!window.angular.equals(newValue, oldValue)) {
                console.log('row edited', rowEntity, colDef, newValue, oldValue);
                rowEntity[colDef.field] = newValue;
                this.ListorFactory.updatePost(rowEntity._id, rowEntity)
                    .then((response) => {

                    })
                    .catch((error) => {
                        console.log('target list update item error', error);
                    })
            }
        });
        console.log(gridApi);
    }


    prepareGridColumns(options) {
        let setUpColumns = [
            this.GridColumns.status(options.status),
            this.GridColumns.link(),
            this.GridColumns.createdTime(),
            this.GridColumns.title(),
            this.GridColumns.company(),
            this.GridColumns.resume(),
            this.GridColumns.city(), // initially hidden
            this.GridColumns.state(options.states), // initially hidden
            this.GridColumns.notes(), // initially hidden
            this.GridColumns.applied(), // initially hidden
            this.GridColumns.details(),
            this.GridColumns.remove(),
            //    this.GridColumns.empty(),
            this.GridColumns.updatedTime()  // initially hidden
        ];
        return Promise.all(setUpColumns);
    }


    prepareGridMenu(){
       return [
           {
               title: 'Show Filters',
               action: ($event) => {
                   console.log('toggle filtering clicked');
                   let uiMenu = document.querySelector('.ui-grid-menu-button');
                   let extendMenuButton = window.angular.element(uiMenu);
                   if(!this.gridOptions.enableFiltering){
                       if(!extendMenuButton.hasClass('filter-size-menu-button')){
                           extendMenuButton.addClass('filter-size-menu-button')
                       }
                   } else {
                       if(extendMenuButton.hasClass('filter-size-menu-button')){
                           extendMenuButton.removeClass('filter-size-menu-button')
                       }
                   }
                   console.log('uiMenu', uiMenu);
                   this.gridOptions.enableFiltering = !this.gridOptions.enableFiltering;
                   this.gridApi.core.notifyDataChange( this.uiGridConstants.dataChange.COLUMN );
               },
               shown: ($event) =>{
                  return !this.gridOptions.enableFiltering
               },
               order: 210
           },
           {
               title: 'Hide Filters',
               action: ($event) => {
                   console.log('toggle filtering clicked');
                   let uiMenu = document.querySelector('.ui-grid-menu-button');
                   let extendMenuButton = window.angular.element(uiMenu);
                   if(!this.gridOptions.enableFiltering){
                       if(!extendMenuButton.hasClass('filter-size-menu-button')){
                           extendMenuButton.addClass('filter-size-menu-button')
                       }
                   } else {
                       if(extendMenuButton.hasClass('filter-size-menu-button')){
                           extendMenuButton.removeClass('filter-size-menu-button')
                       }
                   }
                   console.log('uiMenu', uiMenu);
                   this.gridOptions.enableFiltering = !this.gridOptions.enableFiltering;
                   this.gridApi.core.notifyDataChange( this.uiGridConstants.dataChange.COLUMN );
               },
               shown: ($event) =>{
                   return this.gridOptions.enableFiltering
               },
               order: 210
           }
       ]
    }



    /**
     * ======================= OPERATION/INTERACTION METHODS ===============================
     */

    refresh() {
        this.gridApi.core.refresh();
    }

    toggleFiltering(){
        console.log('toggle filtering clicked');
        let uiMenu = document.querySelector('.ui-grid-menu-button');
        let extendMenuButton = window.angular.element(uiMenu);
        if(!this.gridOptions.enableFiltering){
            if(!extendMenuButton.hasClass('filter-size-menu-button')){
                extendMenuButton.addClass('filter-size-menu-button')
            }
        } else {
            if(extendMenuButton.hasClass('filter-size-menu-button')){
                extendMenuButton.removeClass('filter-size-menu-button')
            }
        }
        console.log('uiMenu', uiMenu);
        this.gridOptions.enableFiltering = !this.gridOptions.enableFiltering;
        this.gridApi.core.notifyDataChange( this.uiGridConstants.dataChange.COLUMN );
    };


    addColumn(column) {
        // using  initially hidden as alternative to dynamically adding columns
        console.log(this.GridColumns[column]);
        this.GridColumns[column]()
            .then((response) => {
                console.log(response);
                this.columns.push(response);
                this.gridApi.core.refresh();
            })
    }

    columnSelect(current) {
        this.ListorFactory.columnSelect(current)
    }

    taskForm(id) {
        let postId = id ? id : '';
        this.$rootScope.$emit('listorAddTask', postId);
    }

    goToEditMaterials(id) {
        if (!this.emptyList) {
            for (let i = 0; i < this.gridOptions.data.length; i++) {
                if (this.gridOptions.data[i]._id === id) { //Cannot read property 'data' of undefined
                    this.store.set('lastEdited', id);
                }
            }
            this.$state.go({to: 'doediting', params: id._id});
        }
    }


    getData() {
        this.ListorFactory.getData()
            .then((response) => {
                this.postListing = response;
                this.gridOptions.data = response;
                /* this.gridOptions = {
                 enableSorting: true,
                 data: response,
                 columnDefs: this.columns,
                 enableColumnResize: true,
                 onRegisterApi: (gridApi) => {
                 this.gridApi = gridApi;
                 gridApi.edit.on.afterCellEdit(this.$scope, function (rowEntity, colDef) {
                 console.log('edit', rowEntity);
                 })
                 }
                 };*/
                return this.postListing;
            });
    };


   /* updateEntry(data, info) {
        if (info === 'status') {
            var otherData = this.statuses
        }
        this.ListorFactory.updateStatus(data, info, otherData)
            .result
            .then((response) => {
                this.gridOptions.data = this.postListing;
            }, () => {
                console.info('modal-component dismissed at: ' + new Date());
            });
    }*/

    selectedRow(data) {
        this.selectedData = data;
        if (this.selectedData) {
            this.dataSelected = true;
        }
    }

    removeTargetPosting(postId) {
        this.ListorDataFactory.removePosting(postId).then((response) => {
            this.getData();
        })
    }

    //================= Data Preparation for Editing or Filtering Actions =====================================

    buildStatusList(results) {
        let statuses = [];
        let statusOptions = [];
        for (var i = 0; i < results.length; i++) {
            if (statuses.indexOf(results[i].status) === -1) {
                statuses.push(results[i].status);
                statusOptions.push({label: results[i].status, value: results[i].status});
            }
        }
        return {statuses: statuses, statusOptions: statusOptions};
    }

    buildStateList(results){
        let states = [];
        let stateslist = [];
        for (var i = 0; i < results.length; i++) {
            if (states.indexOf(results[i].state) === -1) {
                states.push(results[i].state);
                stateslist.push({label: results[i].state, value: results[i].state});
            }
        }
        return stateslist;
    }


}

GridController.$inject = GridControllerInjectables;