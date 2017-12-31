let TaskUpdateServiceInjectables = ['ListorDataFactory', '$uibModal'];


export class TaskUpdateService{
    constructor(ListorDataFactory, $uibModal){
        this._ListorDataFactory = ListorDataFactory;
        this._$uibModal = $uibModal;
    }


    updatePostTaskList(postId, taskArray){
        this._ListorDataFactory.updatePostTaskList(null, postId, taskArray).then((response) => {
            console.log(response);
        })
        // /updatePostTaskList/:userId/:postId
    }

    taskUpdateModal(task) {
        console.log(task);
        return this._$uibModal.open({
            animation: true,
            size: 'md',
            // backdrop: 'static',
            component: 'taskUpdate',
            resolve: {
                taskData: () => {
                    return task;
                }
            }
        });
    }
}

TaskUpdateService.$inject = TaskUpdateServiceInjectables;

