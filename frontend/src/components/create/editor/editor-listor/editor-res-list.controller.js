let ResListorControllerInjectables = ['$rootScope', 'EditorFactory', 'EditorDataFactory', '$location', '$state'];

export default class ResListorController {
    constructor($rootScope, EditorFactory, EditorDataFactory, $location, $state) {
        'ngInject';
        this.EditorFactory = EditorFactory;
        this.EditorDataFactory = EditorDataFactory;
        this.$location = $location;
        this.$state = $state;
        this.$rootScope = $rootScope;
    }

    $onInit() {
        window.angular.element(this.pageLoadComplete());
    };

    pageLoadComplete(){
        this.$rootScope.$emit('navigationPageLoaded', 'ResListorController');
    }
    /*
     EditorDataFactory.getResListing().then((response){
     vm.resumeList = response;
     })
     */

    goBack() {
        let postId = this.$location.search().post;
        this.$state.go('editing', {post: postId})
    }

    makeSelection(resData) {
        let postId = this.$location.search();
        this.EditorDataFactory.copy(postId.post, resData._id)
            .then((response) => {
            this.$state.go('editing', {post: postId.post})
        })

    }
}


ResListorController.$inject = ResListorControllerInjectables;