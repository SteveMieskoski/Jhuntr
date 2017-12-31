let TaskHandlerServiceInjectables = ['ListorDataFactory', 'TaskUpdateService', 'TaskAddService'];


export class TaskHandlerService {
    constructor(ListorDataFactory, TaskUpdateService, TaskAddService) {
        this._ListorDataFactory = ListorDataFactory;
        this._taskUpdateService = TaskUpdateService;
        this._taskAddService = TaskAddService;
    }


    updatePostTaskList(postId, taskArray) {
        this._ListorDataFactory.updatePostTaskList(null, postId, taskArray).then((response) => {
            console.log(response);
        })
        // /updatePostTaskList/:userId/:postId
    }

    addTask() {
       return this._taskAddService.taskAddModal()
           .result;
    }
    updateTask(task) {
       return this._taskUpdateService.taskUpdateModal(task)
            .result;
    }
}

TaskHandlerService.$inject = TaskHandlerServiceInjectables;

