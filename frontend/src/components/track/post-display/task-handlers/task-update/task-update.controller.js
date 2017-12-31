let TaskUpdateControllerInjectables = ['TaskHandlerService'];

export default class TaskUpdateController{
    constructor(TaskHandlerService){
        this._service = TaskHandlerService;
        this.newPostTask = {};
        this.editingCopy = '';
        this.taskEdit=false;
    }

    $onInit(){
        this.taskData = this.resolve.taskData;
    }

    addPostTask(){
        // this.newPostTask = {};
        if(Object.keys(this.newPostTask).length > 0){
            this.appendTasks(this.newPostTask);
            //  this.newPostTask['complete'] = false;
            //  this.postData.tasks.push(this.newPostTask);
            this.newPostTask = {};
        } else {
            console.log('NEW TASK');
        }
    }

    updateTask(task){
        this.close({$value: task})
    }

    savePostTaskEnter(evt){
        if(evt.keyCode === 13){
            this.savePostTask();
        }
    }

    savePostTask(){
        if(Object.keys(this.newPostTask).length > 0){
            this.appendTasks(this.newPostTask);
            // this.postData.tasks.push(this.newPostTask);
            this.newPostTask = {};
            // this._PostDisplayService.updatePostTaskList(this.postData._id, this.postData.tasks)
        } else {
            this._service.updatePostTaskList(this.postData._id, this.postData.tasks)
        }
    }

    saveTaskEdit(evt, editingCopy){
        if(evt && evt.keyCode !== 13) return;
        this.postData.tasks[this.editingIndex] = editingCopy;
        this._service.updatePostTaskList(this.postData._id, this.postData.tasks);
        this.taskEdit = !this.taskEdit;
        this.editingCopy = '';
        this.editingIndex = -1;
    }

    updateTaskState(index, state){
        console.log('index: ', index, 'state: ', state);
        if(state){
            this.postData.tasks[index].complete = false;
            console.log('task not complete', this.postData.tasks[index].complete);
            this._service.updatePostTaskList(this.postData._id, this.postData.tasks)
        } else {
            this.postData.tasks[index].complete = true;
            console.log('task complete', this.postData.tasks[index].complete);
            this._service.updatePostTaskList(this.postData._id, this.postData.tasks)
        }


    }


    appendTasks(newTask){
        newTask['complete'] = false;
        this.postData.tasks.push(newTask);
        this._service.updatePostTaskList(this.postData._id, this.postData.tasks)
    }
}

TaskUpdateController.$inject = TaskUpdateControllerInjectables;

