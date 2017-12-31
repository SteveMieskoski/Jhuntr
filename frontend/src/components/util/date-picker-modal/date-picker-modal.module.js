
import {datePickerModal} from "./date-picker-modal.component.js";
import {durationPickerComponent} from "./duration-picker.component.js";
import {PickerModalComponent} from "./picker-modal.component.js";
import {DatePickerService} from "./date-picker-modal.service.js";

export const dataPickerModal = angular.module('datePickerModal', [])
    .component('datePicker', datePickerModal)
    .component('durationPicker', durationPickerComponent)
    .component('pickerModal', PickerModalComponent)
    .service('datePickerService', DatePickerService)

    .name;