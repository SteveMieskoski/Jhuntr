let statusLabelChangeControllerInjectables = ['PostDisplayService'];


export default class statusLabelChangeController{
    constructor(PostDisplayService){
        'ngInject';
        this.service = PostDisplayService;
        this.newTaskForm = false;
        this.newLabel = "";
        this.postTasks = [];
        this.newPostTask = {};
    }

    $onInit() {
        this.data = this.resolve.postData;
        this.oldLabel = this.resolve.statusLabel;
        this.newLabel = window.angular.copy(this.oldLabel);
    }

    changeLabel(label){
        var labelChanges = [];
        for(var i=0; i<this.data[this.oldLabel].length; i++){
            labelChanges.push({_id: this.data[this.oldLabel][i]._id, status: label})
        }
        this.updateStatusArrays(labelChanges);
        this.close({$value: this.newLabel})
    }


    updateStatusArrays(statuses){
        this.service.updateStatusArrays(statuses)
    }


}

statusLabelChangeController.$inject = statusLabelChangeControllerInjectables;