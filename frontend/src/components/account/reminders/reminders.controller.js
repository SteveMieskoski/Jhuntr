let RemindersControllerInjectables = ['$rootScope', 'RemindersDataFactory', '$uibModal', '$q'];

export default class RemindersController {
    constructor($rootScope, RemindersDataFactory, $uibModal, $q) {
        'ngInject';
        this.$rootScope = $rootScope;
        this.RemindersDataFactory = RemindersDataFactory;
        this.$uibModal = $uibModal;
        this.$q = $q;

        this.reminderDateSelect = false;
        this.showReminderInput = false;
        this.showReminderUpdate = false;
        this.newReminder = {};

        this.addReminderUnbind = this.$rootScope.$on('listorAddReminder', (evt, data) => {
            this.addReminderForm(data);

        });
    }

    $onInit() {
        let l = this.reminderList.length;
        this.reminderEditState = [];
        while (l--) {
            this.reminderEditState.push({state: false, data: window.angular.copy(this.reminderList[l])});
        }
    }

    $onDestroy() {
        this.addReminderUnbind();
    }

    reminderInput() {
        this.showInput = !this.showInput;
    }


    addReminderForm(id) {
        let postId = id ? id : '';
        this.newReminder = {};
        this.newReminder.posting = postId;
        this.showReminderInput = !this.showReminderInput;
        this.AddReminderModal();
    }

    AddReminderModal(postId) {
        let postingId = postId ? postId : '';
        let modalInstance = this.$uibModal.open({
            animation: true,
            size: 'lg',
            component: 'remindersModal',
            resolve: {
                postId: this.$q.when(postingId)
            }
        });

        modalInstance.result.then((data) => {
            this.addReminder(data);
        }, () => {
            console.info('modal-component dismissed at: ' + new Date());
        });
    }

    addReminder(data) {
        console.log(data);
        /*    RemindersDataFactory.addReminder(data).then((response){
         this.reminderList.push(response);
         this.reminderEditState[this.reminderList.length] = {state: false, data: response};
         this.showReminderInput = !this.showReminderInput;
         this.newReminder = {};
         }) */
    }


    updateReminder(data, index) {
        this.RemindersDataFactory.updateReminder(data._id, data).then((response) => {
                this.reminderList[index] = response;
                this.reminderEditState[index].state = !this.reminderEditState[index].state;
            }
        )

    }

    completeReminder(reminder, index) {
        let data = {_id: reminder._id, complete: true};
        this.RemindersDataFactory.updateReminder(reminder._id, data).then((response) => {
                this.reminderList[index] = response;
            }
        )
    }

    deleteReminder(reminder, index) {
        this.RemindersDataFactory.deleteReminder(reminder._id).then((response) => {
                this.reminderList.splice(index, 1);
            }
        )
    }


}

RemindersController.$inject = RemindersControllerInjectables;