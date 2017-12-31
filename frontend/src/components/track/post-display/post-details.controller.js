let postDetailsControllerInjectables = ['PostDisplayService'];

export default class postDetailsController{
    constructor(PostDisplayService){
        this._PostDisplayService = PostDisplayService;

        this.newPostTask = {};
    }

    $onInit(){
        this.postData = this.resolve.postData;
        this.postStatus = this.resolve.status;
        this.postTotal = this.resolve.total;
        this.modalActive = 'one';
    }

    activeModal(tag){
        this.modalActive = tag;
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

    savePostTask(){
        if(Object.keys(this.newPostTask).length > 0){
            this.appendTasks(this.newPostTask);
           // this.postData.tasks.push(this.newPostTask);
            this.newPostTask = {};
           // this._PostDisplayService.updatePostTaskList(this.postData._id, this.postData.tasks)
        } else {
            this._PostDisplayService.updatePostTaskList(this.postData._id, this.postData.tasks)
        }
    }

    updateTaskState(index, state){
        console.log('index: ', index, 'state: ', state);
        if(state){
            this.postData.tasks[index].complete = false;
            console.log('task not complete', this.postData.tasks[index].complete);
            this._PostDisplayService.updatePostTaskList(this.postData._id, this.postData.tasks)
        } else {
            this.postData.tasks[index].complete = true;
            console.log('task complete', this.postData.tasks[index].complete);
            this._PostDisplayService.updatePostTaskList(this.postData._id, this.postData.tasks)
        }


    }


    appendTasks(newTask){
        newTask['complete'] = false;
        this.postData.tasks.push(newTask);
        this._PostDisplayService.updatePostTaskList(this.postData._id, this.postData.tasks)
    }

    openPostEdit(){
        console.log('send data to edit', this.postData);
        this.close();
        this._PostDisplayService.plainPostUpdateModal(this.postData, this.postTotal)
    }

    goToExpandedEdit(){}

}


postDetailsController.$inject = postDetailsControllerInjectables;