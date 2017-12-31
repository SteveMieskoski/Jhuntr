let PostListControllerInjectables = ['$rootScope', '$timeout', '$scope', 'PostDisplayService', '$timeout', 'dragulaService'];

export default class PostListController {
    constructor($rootScope, $timeout, $scope, PostDisplayService, dragulaService) {
        'ngInject';
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.service = PostDisplayService;
        this.dragulaService = dragulaService;

        this.dataLoaded = false;
        this.$scope.postArrays = [];
        this.$scope.data = {};
        this.data = {};
        this.showTargetAdd = false;
        this.showSentAdd = false;
        this.showInterviewingAdd = false;
        this.showOffersAdd = false;
        this.updateArray = [];
        this.newLabelCreate = false;
        this.mouseOverAddJob = false;

        this.$scope.$on('targetList.drag', (e, el) => {
            el.removeClass('ex-moved');
        });

        this.$scope.$on('targetList.drop', (e, el, target) => {
            el.addClass('ex-moved');
            //  console.log(e, el, target);
        });

        this.$scope.$on('targetList.over', (e, el, container) => {
            container.addClass('ex-over');
        });

        this.$scope.$on('targetList.out', (e, el, container) => {
            container.removeClass('ex-over');
        });

        this.$scope.$on('targetList.drop-model', (el, target, source) => {
            console.log('elem ', el, 'target ', target, 'source ', source);
            this.updateStatusArrays([{_id: target[0].id, status: source[0].id}]);
        });


        // todo: find a better way to watch/check the content of each and persist the changes.
        this.$rootScope.$on('updateStatues', () => {this.getStatuses()});
    }

    $onInit() {
        window.angular.element(this.pageLoaded());
        this.getStatuses();
    }


    $postLink() {
        this.$timeout(() => {
            if (this.dataLoadfinished) {
                console.log('data load true');
                this.dataLoaded = true;
            }
        }, 750);
    }

    pageLoaded() {
        this.$rootScope.$emit('navigationPageLoaded', 'user-home.controller');
    }


    showData() {
        console.log(this.$scope.postArrays);
    }


    changeLabel(data, oldlabel) {
        this.service.statusLabelChangeModal(data, oldlabel)
            .result
            .then((response) => {
                console.log('label update response', response);
                if (response) {
                    this.getStatuses();
                }
            })
    }

    openTasks(tasks){
        var count = 0;
        tasks.forEach((task) => {
            if(!task.complete){
                count++;
            }
        });
        return count;
    }

    addAJob(plain, status){
        var statusOptions;
        if(plain){
            statusOptions = status;
        } else {
            statusOptions = Object.keys(this.data);
        }
        this.service.addPostModal(statusOptions, plain)
            .result
            .then((response) => {
                if (response) {
                    this.postListUpdated({value: true});
                    console.log(response);
                    if(this.data[response.status]){
                        this.data[response.status].push(response);
                    } else {
                        this.data[response.status] = [response];
                    }
                    this.createNewLabel = "";

                }
            })
    }


    getStatuses() {
        this.service.getStatuses()
            .then((response) => {
                this.data = {};
                this.$scope.data = {};
                console.log('getStatuses response', response);
                let thingArray = [];
                this.dataLoadfinished = true;
              //  this.statusId = response._id;
                this.data = response;
                this.$scope.data = response;
                for (var prop in response) {
                    if (Array.isArray(response[prop])) {
                        this.$scope.postArrays.push({data: response[prop], label: prop});
                        thingArray.push(prop);
                    }
                }
            })
    }

    viewPostDetails(postData, status, total) {
        this.service.viewPostDetailsModal(postData, status, total)
            .result
            .then((response) => {
                // note: Only CRUD operation in this modal acts upon the posting's task list.
                this.getStatuses();  // todo find a better way to update task list if changed
                console.log('closed response', response);
            }, (response) => {
                this.getStatuses(); // todo find a better way to update task list if changed
                console.log('dismissed response', response);
            })
    }

    updateStatusArrays(statuses) {
        // if(this.dataLoaded){
        console.log('updateStatusArrays');

        this.service.updateStatusArrays(statuses)
        //  }

    }

    showAddAJob(){
        var lists = Object.keys(this.data);
        if(lists < 3){
            for(var i=0; i<lists.length; i++){
              if(this.data[lists[i]].length > 2){
                  return false;
              }
            }
            return true;
        }

    }


    addPlainPostForm(status) {

        this.service.addPlainPostModal(status)
            .result
            .then((response) => {
                if (response) {
                    console.log(response);
                    if(this.data[response.status]){
                        this.data[response.status].push(response);
                    } else {
                        this.data[response.status] = [response];
                    }
                    this.createNewLabel = "";
                    //  for(var prop in response){
                    //     if(Array.isArray(response[prop])){
                    //          this.$scope[prop] = response[prop]
                    //     }
                    //}
                }
            })
    }

}

PostListController.$inject = PostListControllerInjectables;