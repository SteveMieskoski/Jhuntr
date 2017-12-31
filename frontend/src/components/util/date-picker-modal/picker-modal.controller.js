let PickerModalControllerInjectables = [];

export default class PickerModalController {
    constructor() {
       // this.dtStart = new Date();
       // this.dtStop = new Date();
       // this.dtStart = null;
       // this.dtStop = null;
        this.dt = null;
        this.setStart = true;
        this.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        this.format = this.formats[0];
        this.altInputFormats = ['M!/d!/yyyy'];
        this.items = [];
        this.opened = false;
        this.opened2 = false;



    }

    $onInit() {
        this.dateOptions = {
        //    customClass: (data) => { return this.getDayClass(data)},
            formatYear: 'yy',
            maxDate: new Date(),
            minDate: new Date(2000, 5, 22),
            startingDay: 1
        };
    }

    today(){
        this.setStart = new Date();
    }



    setDate(year, month, day) {
        this.dtStart = new Date(year, month, day);
    };

    // Date Picker Methods
    clear() {
        this.dt = null;
    }

    setDate(year, month, day) {
        this.dt = new Date(year, month, day);
    }

    submit() {
        this.close({$value: this.dt})
    }
}

PickerModalController.$inject = PickerModalControllerInjectables;