let TaskAddServiceInjectables = ['ListorDataFactory', '$uibModal'];


export class TaskAddService{
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

    taskAddModal() {
        return this._$uibModal.open({
            animation: true,
            size: 'md',
            // backdrop: 'static',
            component: 'taskAdd'
        });
    }
}

TaskAddService.$inject = TaskAddServiceInjectables;

