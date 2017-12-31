import linkIcon from  "../../../assets/icons/external-link.svg";
import editIcon from "../../../assets/icons/sketch-pencil.svg";

let ListorListControllerInjectables = ['$scope', 'ListorDataFactory', 'ListorFactory', '$rootScope', 'uiGridConstants', '$timeout', '$state', 'store'];

export default class ListorListController {
    constructor($scope, ListorDataFactory, ListorFactory, $rootScope, uiGridConstants, $timeout, $state, store) {
        'ngInject';
        this.ListorDataFactory = ListorDataFactory;
        this.ListorFactory = ListorFactory;
        this.$rootScope = $rootScope;
        this.uiGridConstants = uiGridConstants;
        this.$timeout = $timeout;
        this.$state = $state;
        this.store = store;
        this.$scope = $scope;

        this.show = 'targets';

        this.$rootScope.$on('updateData', () => {
            this.gridOptions.data = this.getData();
        });

    }

    $onInit() {
        console.log(this.postListing);
        if (this.postListing) {
            if (this.postListing.length === 0) {
                this.ListorFactory.emptyList();
                this.emptyList = true;
            } else {
                this.gridData = this.postListing;
            }
        }
        window.angular.element(this.pageLoadComplete());
    };

    pageLoadComplete() {
        this.$rootScope.$emit('navigationPageLoaded', 'ListorListController');
    }


    columnSelect(current){
        this.ListorFactory.columnSelect(current)
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

    postDataUpdated(value){
        console.log('postDataUpdated', value);
        if(value){
            this.getData();
        }
    }

    getData() {
        this.ListorFactory.getData()
            .then((response) => {
                this.postListing = response;
                this.gridOptions.data = response;
                return this.postListing;
            });
    };


    showSummary() {
        this.show = 'summary';
    }

    showMap() {
        this.show = 'map';
    }

    showTargets() {
        this.show = 'targets';
    }
}

ListorListController.$inject = ListorListControllerInjectables;