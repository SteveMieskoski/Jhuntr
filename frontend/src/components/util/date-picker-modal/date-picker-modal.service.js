let DatePickerServiceInjectables = [ '$q', '$uibModal', "$http", "store", "$rootScope"];

export class DatePickerService {
    constructor($q, $uibModal, $http, store, $rootScope) {
        'ngInject';
        this._$uibModal = $uibModal;
        this._$q = $q;
        this._store = store;
        this._$rootScope = $rootScope;
    }

    datePickerModal() {
        return this._$uibModal.open({
            animation: true,
            size: 'md',
            // backdrop: 'static',
            component: 'datePicker',
            resolve: {
            }
        });
    }

    durationPickerModal() {
        return this._$uibModal.open({
            animation: true,
            size: 'md',
            // backdrop: 'static',
            component: 'durationPicker',
            resolve: {
            }
        });
    }





}

DatePickerService.$inject = DatePickerServiceInjectables;