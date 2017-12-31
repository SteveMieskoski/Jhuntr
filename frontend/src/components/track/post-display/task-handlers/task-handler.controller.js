let TaskHandlerControllerInjectables = ['TaskHandlerService'];

export default class TaskHandlerController{
    constructor(TaskHandlerService){
        this._service = TaskHandlerService;
        this.newPostTask = {};
        this.editingCopy = '';
        this.taskEdit=false;
    }

    addPostTask(){
        this._service.addTask()
            .then((response) => {
                    console.log('task add response', response);
                    response['complete'] = false;
                    this.postData.tasks.push(response);
                    this._service.updatePostTaskList(this.postData._id, this.postData.tasks)
                },
                (dismiss) => {

                })

        // this.newPostTask = {};
      /*  if(Object.keys(this.newPostTask).length > 0){
            this.appendTasks(this.newPostTask);
            //  this.newPostTask['complete'] = false;
            //  this.postData.tasks.push(this.newPostTask);
            this.newPostTask = {};
        } else {
            console.log('NEW TASK');
        } */
    }

    editTask(task, index){
        let editingCopy = window.angular.copy(task);
        this._service.updateTask(editingCopy)
            .then((response) => {
                    console.log('task update response', response);
                    this.postData.tasks.splice(index, 1, response);
                    console.log(this.postData.tasks[index]);
                    this._service.updatePostTaskList(this.postData._id, this.postData.tasks);
                },
                (dismiss) => {

                })
      /*  console.log(index);
        if(index || index === 0){
            this.editingCopy = window.angular.copy(this.postData.tasks[index]);
            console.log(this.editingCopy);
            this.editingIndex = index;
        }
        this.taskEdit = boolean;*/
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

TaskHandlerController.$inject = TaskHandlerControllerInjectables;

