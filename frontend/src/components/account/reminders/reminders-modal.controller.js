let RemindersModalControllerInjectables = ['uibDateParser'];

export default class RemindersModalController {
    constructor(uibDateParser){
        'ngInject';
        this.uibDateParser = uibDateParser;


        this.newReminder = {};
        this.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };
    }

   $onInit() {
       this.newReminder.posting = this.resolve.postId;
       this.newReminder.date = new Date();
    };

    ok() {
       this.close({
            $value: this.newReminder
        });
    };

    cancel() {
       this.dismiss({
            $value: 'cancel'
        });
    };

};

RemindersModalController.$inject = RemindersModalControllerInjectables;