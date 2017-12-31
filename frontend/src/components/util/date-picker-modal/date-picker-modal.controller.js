let datePickControllerInjectables = [];

export default class datePickController{
    constructor(){
        this.dt = new Date();
        this.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(),
            startingDay: 1
        };
        this.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        this.format = this.formats[0];
        this.altInputFormats = ['M!/d!/yyyy'];
    }

    $onInit(){
        this.dt = new Date();
        this.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(),
            minDate: new Date(2000, 5, 22),
            startingDay: 1
        };
    }

    // Date Picker Methods
    clear(){
        this.dt = null;
    }

    datePickOpen(){
        this.opened = true;
    }

    setDate(year, month, day){
        this.dt = new Date(year, month, day);
    }

    submit(){
        this.close({$value: this.dt})
    }
}

datePickController.$inject = datePickControllerInjectables;