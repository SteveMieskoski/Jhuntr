import linkIcon from  "../../../../assets/icons/external-link.svg";
import editIcon from "../../../../assets/icons/sketch-pencil.svg";


let TableServiceInjectables = ['ListorDataFactory', '$rootScope', 'uiGridConstants', '$timeout', '$state', 'store', 'CreatorDataFactory', 'datePickerService'];

export class TableService {
    constructor(ListorDataFactory, $rootScope, uiGridConstants, $timeout, $state, store, CreatorDataFactory, datePickerService) {
        this.ListorDataFactory = ListorDataFactory;
        this.CreatorDataFactory = CreatorDataFactory;
        this.datePickerService = datePickerService;
        this.$rootScope = $rootScope;
        this.uiGridConstants = uiGridConstants;
        this.$timeout = $timeout;
        this.$state = $state;
        this.store = store;

        this.show = 'targets';
    }

    // ============  Column Utilities ====================

    highlightFilteredHeader(row, rowRenderIndex, col, colRenderIndex) {
        if (col.filters[0].term) {
            return 'header-filtered';
        } else {
            return '';
        }
    };

    listResumes() {
        return this.CreatorDataFactory.getResList()
            .then((response) => {
                console.log(response);
                let resumeList = [];
                for (var i = 0; i < response.length; i++) {
                    resumeList.push({label: response[i].ref_label, value: response[i].ref_label})
                }
                console.log('RESUME LIST LENGTH', resumeList.length);
                return resumeList;
            })
            .catch((error) => {
                console.log(error);
            })
    }

    datePicker() {
        this.datePickerService.durationPickerModal()
            .result
            .then(
                (response) => {
                    console.log('duration date picker response', response);
                },
                (error) => {

                })
    }

    customDatefilter(){

    }

    // ============  Column Definitions ====================

    applications() {
        return new Promise((resolve, reject) => {
            resolve({
                displayName: 'Application',
                field: 'Application',
                minWidth: 115,
                maxWidth: 120,
                enableCellEdit: false,
                cellTemplate: '<span ui-sref="editing({post : row.entity._id})" class="to-editor">Edit ' +
                '<img src="' + editIcon + '" width=20 height=20 aria-hidden="true">' +
                '</span>'
            })
        })
    }

    applied() {
        return new Promise((resolve, reject) => {
            resolve({
                displayName: 'Applied',
                field: 'dateApplied',
                cellTooltip: true,
                enableCellEdit: true,
                visible: false,
                cellFilter: 'date:\'yyyy-MM-dd\'',
                filterHeaderTemplate: 'ui-grid/ui-grid-date-filter',
                filters: [
                    {
                        condition: function(term, value, row, column){
                            if (!term) return true;
                            var valueDate = new Date(value);
                            return valueDate >= term;
                        },
                        placeholder: 'Greater than or equal'
                    },
                    {
                        condition: function(term, value, row, column){
                            if (!term) return true;
                            var valueDate = new Date(value);
                            return valueDate <= term;
                        },
                        placeholder: 'Less than or equal'
                    }
                ]
            })
        })
    }

    city() {
        return new Promise((resolve, reject) => {
            resolve({

                displayName: 'City',
                field: 'city',
                cellTooltip: true,
                enableCellEdit: false,
                visible: false,
            })
        })
    }

    company() {
        return new Promise((resolve, reject) => {
            resolve({

                displayName: 'Company',
                field: 'company',
                cellTooltip: true,
                enableCellEdit: true,
            })
        })
    }

    createdTime() {
        return new Promise((resolve, reject) => {
            resolve({
                displayName: 'Added',
                field: 'created_at',
                minWidth: 120,
                enableCellEdit: false,
                cellTemplate: '<span>&nbsp;{{row.entity.created_at.slice(0,10)}}</span>',
                cellFilter: 'date:\'yyyy-MM-dd\'',
                filterHeaderTemplate: 'ui-grid/ui-grid-date-filter',
                filters: [
                    {
                        condition: function(term, value, row, column){
                            if (!term) return true;
                            var valueDate = new Date(value);
                            return valueDate >= term;
                        },
                        placeholder: 'Greater than or equal'
                    },
                    {
                        condition: function(term, value, row, column){
                            if (!term) return true;
                            var valueDate = new Date(value);
                            return valueDate <= term;
                        },
                        placeholder: 'Less than or equal'
                    }
                ]
            })
        })
    }

    details() {
        return new Promise((resolve, reject) => {
            resolve({
                displayName: 'Details',
                field: 'Application',
                minWidth: 115,
                maxWidth: 120,
                enableCellEdit: false,
                enableFiltering: false,
                cellTemplate: '<span ui-sref="postcomplete({entry : row.entity._id, status : row.entity.status})" class="to-editor">Details ' +
                '<img src="' + editIcon + '" width=20 height=20 aria-hidden="true">' +
                '</span>'
            })
        })
    }

    empty() {
        return new Promise((resolve, reject) => {
            resolve({
                displayName: '',
                field: 'empty',
                maxWidth: 30,
                visible: false,
                enableCellEdit: false,
                enableFiltering: false,
            })
        })
    }

    label() {
        return new Promise((resolve, reject) => {
            resolve({
                displayName: 'Label',
                field: 'label',
                cellTooltip: true,
                enableCellEdit: true,
                headerCellClass: this.highlightFilteredHeader
            })
        })
    }

    link() {
        return new Promise((resolve, reject) => {
            resolve({
                displayName: 'Link',
                field: 'Lnk',
                cellTooltip: 'open posting in new tab',
                enableSorting: false,
                enableFiltering: false,
                minWidth: 45,
                maxWidth: 80,
                visible: true,
                cellTemplate: ' <a ng-if="row.entity.url" target="_blank" ng-if="row.entity.url !== \'none\'" href="{{row.entity.url}}" class="to-external" >' +
                '<img src="' + linkIcon + '" width=30 height=25 aria-hidden="true">' +
                //	'<img src="../../assets/icons/external-link.png" width=30 height=25 aria-hidden="true">' +
                '</a> ' +
                '<span class="small-text" ' +
                ' ng-if="row.entity.url === \'none\'" ' +
                ' ng-click="grid.appScope.$ctrl.updateEntry(row.entity, \'link\')">' +
                'Add Link' +
                '</span>'
            })
        })
    }


    notes() {
        return new Promise((resolve, reject) => {
            resolve({

                displayName: 'Notes',
                field: 'note',
                cellTooltip: true,
                enableCellEdit: true,
                visible: false,
            })
        })
    }

    resume() {
        return this.listResumes()
            .then((resumeList) => {
                return {
                    displayName: 'Resume',
                    field: 'resume_label',
                    minWidth: 115,
                    editDropdownIdLabel: 'label',
                    editDropdownOptionsArray: resumeList,
                    editableCellTemplate: 'ui-grid/dropdownEditor',
                    filter: {
                        type: this.uiGridConstants.filter.SELECT,
                        selectOptions: resumeList
                    }
                }
            })
    }

    remove() {
        return new Promise((resolve, reject) => {
            resolve({
                displayName: 'Delete',
                field: 'Delete',
                enableCellEdit: false,
                enableFiltering: false,
                visible: false,
                cellTemplate: '<button type="button"  ng-click="grid.appScope.$ctrl.removeTargetPosting(row.entity._id)" id="{{row.entity._id}}" class="btn btn-danger btn-xs btn-block"><i class="fa fa-times" aria-hidden="true"></i></button>'
            })
        })

    }

    status(statusOptions) {
        return new Promise((resolve, reject) => {
            resolve({
                displayName: 'Status',
                field: 'status',
                minWidth: 80,
                maxWidth: 200,
                enableCellEdit: true,
                //   editDropdownValueLabel: 'statusOption',
                editDropdownIdLabel: 'label',
                editDropdownOptionsArray: statusOptions,
                editableCellTemplate: 'ui-grid/dropdownEditor',
                cellTemplate: '<span>' +
                ' {{row.entity.status}}' +
                '</span>',
                filter: {
                    type: this.uiGridConstants.filter.SELECT,
                    selectOptions: statusOptions
                }
            });
        })
    }

    state(stateList) {
        return new Promise((resolve, reject) => {
            resolve({

                displayName: 'State',
                field: 'state',
                cellTooltip: true,
                enableCellEdit: false,
                visible: false,
                filter: {
                    type: this.uiGridConstants.filter.SELECT,
                    selectOptions: stateList
                }
            })
        })
    }


    title() {
        return new Promise((resolve, reject) => {
            resolve({
                displayName: 'Position',
                field: 'title',
                cellTooltip: true,
                enableCellEdit: true,
            })
        })
    }






    updatedTime() {
        return new Promise((resolve, reject) => {
            resolve({
                field: 'updated_at',
                visible: false,
                enableCellEdit: false,
                sort: {
                    direction: this.uiGridConstants.DESC,
                    priority: 0
                },
                cellTooltip: true
            })
        })
    }










}

TableService.$inject = TableServiceInjectables;

export let columns = {};

