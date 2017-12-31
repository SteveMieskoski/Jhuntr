let TasksControllerInjectables = ['$rootScope', 'TasksDataFactory', '$uibModal'];

export default class TasksController {
    constructor($rootScope, TasksDataFactory, $uibModal) {
        'ngInject';
        this.$rootScope = $rootScope;
        this._TasksDataFactory = TasksDataFactory;
        this.$uibModal = $uibModal;

        this.showTaskInput = false;
        this.showTaskUpdate = false;
        this.newTask = {};
        this.taskList = [];
        this.taskEditState = [];

        this.addTaskUnbind = this.$rootScope.$on('listorAddTask', (evt, data) => {
            this.addTaskForm(data);
        });

        this.taskClasses = {
            addContainerClass: 'fcol-full',
            addTaskClass: 'home-add-task',
            addTaskInput: 'add-background',
            innerContainer: 'frow home-tasks-inner',
            taskRow: 'fcol-full',
            completeIconClass: 'home-tasks-complete',
            inCompleteIconClass: 'home-tasks-complete',
            taskLabelClass: 'home-task-label',
            taskContentClass: 'home-task-content',
            editIconClass: 'home-task-edit',
            deleteIconClass: 'home-task-delete',
            editInputContainer: '',
            editInputClass: 'home-task-text-input',
            updateIconClass: 'home-task-edit-ok',
            cancelIconClass: 'home-task-edit-cancel'
        };
    }
    $onInit() {
        let l;
        if(this.taskList){
            l = this.taskList.length;
        } else {
            this._TasksDataFactory.listTasks() //todo: Cannot read property 'then' of undefined
                .then((response) => {
                this.taskList = response;
                l = this.taskList.length;
                  });
        };
        while (l--) {
            this.taskEditState.push({state: false, preDelete: false});
        }
    }

    $onDestroy() {
        this.addTaskUnbind();
    }

    taskInput() {
        this.showInput = !this.showInput;
    }

    addTaskForm(id) {
        let postId = id ? id : '';
        this.newTask = {};
        this.newTask.posting = postId;
        this.showTaskInput = !this.showTaskInput;
    }

    addTask(data) {
        this._TasksDataFactory.addTask(data).then((response) => {
            this.taskList.push(response);
            this.taskEditState[this.taskList.length] = {state: false, data: response};
            this.showTaskInput = !this.showTaskInput;
            this.newTask = {};
        })
    }


    prepEdit(taskData) {
        this.newTask = {};
        this.newTask = window.angular.copy(taskData);
    }

    updateTask(data, index) {
        this._TasksDataFactory.updateTask(data._id, data).then((response) => {
            this.taskList[index] = response;
            this.taskEditState[index].state = !this.taskEditState[index].state;
        })

    }

    completeTask(task, index) {
        let complete = !task.complete;
        let data = {_id: task._id, complete: complete};
        this._TasksDataFactory.updateTask(task._id, data).then((response) => {
            this.taskList[index] = response;
        })
    }

    deleteTask(task, index) {
        let modalInstance = this.$uibModal.open({
            animation: true,
            size: 'sm',
            template: '<h3>Confirm Delete?</h3> ' +
            '<buttom class="btn btn-large btn-danger" ng-click="$close({result: true, task: task, index: index})">&nbsp;yes&nbsp;</buttom>' +
            '<span>{{task.label}}</span>&nbsp;<span>{{task.content}}</span>' +
            '&nbsp;&nbsp;&nbsp;<buttom class="btn btn-large btn-default pull-right" ng-click="$close({result: false})">&nbsp;&nbsp;&nbsp;no&nbsp;&nbsp;&nbsp;</buttom>'
        });

        modalInstance.result.then((data) => {
            if (data.result) {
                this._TasksDataFactory.deleteTask(task._id).then((response) => {
                    this.taskList.splice(index, 1);
                })
            }
        }, () => {
            console.info('modal-component dismissed at: ' + new Date());
        });
    }

    confirmDeleteModal(task, index) {
        let modalInstance = this.$uibModal.open({
            animation: true,
            size: 'sm',
            template: '<h3>Confirm Delete?</h3> ' +
            '<buttom class="btn btn-large" ng-click="$close({result: true, task: task, index: index})">yes</buttom>' +
            '<buttom class="btn btn-large" ng-click="$close({result: false})">no</buttom>'
        });

        modalInstance.result.then((data) => {
            //    if(data.result){
            //       TasksDataFactory.deleteTask(data.task._id).then((response){
            //         this.taskList.splice(data.index, 1);
            //   })
            //  }
            // addReminder(data);
        }, () => {
            console.info('modal-component dismissed at: ' + new Date());
        });
    }
}

TasksController.$inject = TasksControllerInjectables;