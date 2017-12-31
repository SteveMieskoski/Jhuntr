let durationPickerControllerInjectables = [];

export default class durationPickerController {
    constructor() {
       // this.dtStart = new Date();
       // this.dtStop = new Date();
        this.dtStart = null;
        this.dtStop = null;
        this.dt = null;
        this.setStart = true;
        this.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        this.format = this.formats[0];
        this.altInputFormats = ['M!/d!/yyyy'];
        this.items = [];
        this.opened = false;
        this.opened2 = false;
        this.items = [{
            date: this.dtStart,
            status: 'startDay'
        },{
            date: this.dtStop,
            status: 'endDay'
        }];


    }

    $onInit() {
        this.items = this.setup();
        this.dateOptions = {
            customClass: (data) => { return this.getDayClass(data)},
            formatYear: 'yy',
            maxDate: new Date(),
            minDate: new Date(2000, 5, 22),
            startingDay: 1
        };
    }

    today(){
        this.setStart = new Date();
    }

    getDayClass(data) {
        let stopDay;
        if(this.dt && this.setStart){
            this.dtStart = window.angular.copy(this.dt);
            this.setStart = false;
            this.dt = null;
        } else if(this.dt && !this.setStart){
           let checkSelected = new Date(this.dt).setHours(0, 0, 0, 0);
            let startDay = new Date(this.dtStart).setHours(0, 0, 0, 0);
            if(checkSelected > startDay){
                if(this.dtStop){
                    stopDay = new Date(this.dtStop).setHours(0, 0, 0, 0);
                    if(checkSelected === stopDay){
                        this.dtStop = null;
                        this.dt = null;
                    } else if(checkSelected < stopDay && checkSelected > startDay){
                        this.dtStart= window.angular.copy(this.dt);
                        this.dt = null;
                    } else {
                        this.dtStop = window.angular.copy(this.dt);
                        this.dt = null;
                    }
                } else {
                    this.dtStop = window.angular.copy(this.dt);
                    this.dt = null;
                }
            } else if(checkSelected < startDay){

                this.dtStart= window.angular.copy(this.dt);
                this.dt = null;
            } else {
                this.dtStart= window.angular.copy(this.dt);
                this.dtStop = null;
                this.dt = null;
            }
        }
       // console.log('start',this.dtStart);
        var date = data.date,
            mode = data.mode;
        let checkStop = null;
        if(this.dtStart){
            if (mode === 'day') {
                var today = new Date();
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);
                if(this.dtStop)  checkStop = new Date(this.dtStop).setHours(0, 0, 0, 0);
             //   for (var i = 0; i < this.items.length; i++) {
                    var startDay = new Date(this.dtStart).setHours(0, 0, 0, 0);

                    if (dayToCheck === startDay) {
                        return 'startDay';
                    }

                if(!checkStop){
                    if(dayToCheck > startDay && dayToCheck < today){
                        return 'betweenDays'
                    }
                } else {
                    if(dayToCheck > startDay && dayToCheck < checkStop){
                        return 'betweenDays'
                    }
                }


                    if(checkStop){

                        if (dayToCheck === checkStop) {
                            return 'stopDay';
                        }
                    }
              //  }
            }
        }


        return '';
    }

    getDayClassVersionOne(data) {
        // console.log('start',this.dtStart);
        var date = data.date,
            mode = data.mode;
        let checkStop = null;
        if(this.dtStart){
            if (mode === 'day') {
                var today = new Date();
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);
                if(this.dtStop)  checkStop = new Date(this.dtStop).setHours(0, 0, 0, 0);
                //   for (var i = 0; i < this.items.length; i++) {
                var startDay = new Date(this.dtStart).setHours(0, 0, 0, 0);

                if (dayToCheck === startDay) {
                    return 'startDay';
                }

                if(!checkStop){
                    if(dayToCheck > startDay && dayToCheck < today){
                        return 'betweenDays'
                    }
                } else {
                    if(dayToCheck > startDay && dayToCheck < checkStop){
                        return 'betweenDays'
                    }
                }


                if(checkStop){

                    if (dayToCheck === checkStop) {
                        return 'stopDay';
                    }
                }
                //  }
            }
        }


        return '';
    }

    setup() {
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date(tomorrow);
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        this.items.push({
            date: tomorrow,
            status: 'full'
        });
        this.items.push({
            date: afterTomorrow,
            status: 'partially'
        });

        return this.items;
    }

    setDate(year, month, day) {
        this.dtStart = new Date(year, month, day);
    };

    // Date Picker Methods
    clear() {
        this.dtStart = null;
        this.dtStop = null;
    }

    datePickOpen() {
        this.opened = true;
    }

    datePickOpenTwo() {
        this.opened2 = true;
    }

    setDate(year, month, day) {
        this.dt = new Date(year, month, day);
    }

    submit() {
        this.close({$value: {start: this.dtStart, stop: this.dtStop}})
    }
}

durationPickerController.$inject = durationPickerControllerInjectables;