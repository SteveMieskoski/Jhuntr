let TasksCompleteControllerInjectables = ['$rootScope'];

export default class TasksCompleteController{
	constructor($rootScope){

        this._$rootScope = $rootScope;
	}

	$onInit(){
		console.log(this.allPostsListing);
        this.parseTasks(this.allPostsListing);
        window.angular.element(this.loadComplete());
    }

    loadComplete() {
        this._$rootScope.$emit('navigationPageLoaded', 'tasksCompleteController');
    }


	parseTasks(posts){
        this.allPosts = [];
		for(let i=0; i<posts.length; i++){
			for(let j=0; j<posts[i].tasks.length; j++){
				let task = posts[i].tasks[j];
				task['postId'] = posts[i]._id;
				this.allPosts.push(task);
			}
		}
		console.log(this.allPosts);
	}

}

TasksCompleteController.$inject = TasksCompleteControllerInjectables;

