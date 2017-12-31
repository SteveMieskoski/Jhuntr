let PostDisplayControllerInjectables = ['$rootScope', '$timeout', '$scope', 'PostDisplayService'];

export default class PostDisplayController {
    constructor($rootScope, $timeout, $scope, PostDisplayService) {
        'ngInject';
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;
        this.$scope = $scope;
        this.service = PostDisplayService;

        this.dataLoaded = false;
        /*  this.$scope.targeted = [
         "1 Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
         "2 Sed et sem vel ante dignissim pulvinar vestibulum vel .",
         "3 Sed id sem eget magna tempor malesuada quis vel enim."

         ];

         this.$scope.sent = [
         "4 Curabitur bibendum mi vel neque malesuada pulvinar.",
         "5 Donec non libero sed orci malesuada facilisis eu non .",
         "6 Aenean pretium dui quis risus molestie faucibus."
         ];

         this.$scope.interviewing = [
         "7 Etiam vestibulum nunc sit amet massa efficitur mattis.",
         "8 Donec ut magna quis ex commodo maximus vulputate .",
         "9 Curabitur in sapien pretium, pulvinar urna at, accumsan .",
         ];

         this.$scope.offers = [
         "10 Etiam rhoncus est auctor leo convallis facilisis.",
         "11 Sed posuere erat id tempus varius.",
         "12 In non tortor nec leo consequat euismod in sed neque."
         ]; */

        this.showTargetAdd = false;
        this.showSentAdd = false;
        this.showInterviewingAdd = false;
        this.showOffersAdd = false;


        this.$scope.$on('targeted.drag', (e, el) => {
            el.removeClass('ex-moved');
        });

        this.$scope.$on('targeted.drop', (e, el) => {
            el.addClass('ex-moved');
        });

        this.$scope.$on('targeted.over', (e, el, container) => {
            container.addClass('ex-over');
        });

        this.$scope.$on('targeted.out', (e, el, container) => {
            container.removeClass('ex-over');
        });

        this.$scope.$on('drop-model', (e, el, container) => {
            console.log('dropped-model')
        });


        // todo: find a better way to watch/check the content of each and persist the changes.
        this.$scope.$watchCollection('targeted', (newThing, oldThing) => {
            if(!window.angular.equals(newThing, oldThing)){
                console.log('EVENT!!!', newThing);
                this.updateStatusArrays();
            }
        });
    }

    $onInit() {
        window.angular.element(this.pageLoaded());
        this.getStatuses();
    }


    $postLink() {
        this.$scope.targeted = this.postArray
       /* this.$timeout(() => {
            if(this.dataLoadfinished){
                console.log('data load true');
                this.dataLoaded = true;
            }
         }, 750);*/
    }

    pageLoaded() {
        this.$rootScope.$emit('navigationPageLoaded', 'user-home.controller');
    }


    getStatuses(){
        /*this.service.getStatuses().then((response) => {
            console.log(response);
            this.dataLoadfinished = true;
            this.statusId = response._id;
           // this.$scope.targeted = response.targeted;
            this.$scope.sent = response.sent;
            this.$scope.interviewing = response.interviewing;
            this.$scope.offers = response.offers;
        })*/
    }

    viewPostDetails(postData){
        this.service.viewPostDetailsModal(postData)
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

    updateStatusArrays() {
        if(this.dataLoaded){
            console.log('updateStatusArrays');

           let statuses = {
                targeted: this.$scope.targeted,
                sent: this.$scope.sent,
                interviewing: this.$scope.interviewing,
                offers: this.$scope.offers
            };
          this.service.updateStatusArrays(this.statusId, statuses)
        }

    }


    addPlainPostForm(status) {

        this.service.addPlainPostModal(status)
            .result
            .then((response) => {
                if(response){
                    console.log(response);
                    for(var prop in response){
                        if(Array.isArray(response[prop])){
                            this.$scope[prop] = response[prop]
                        }
                    }
                }
            })
    }

}

PostDisplayController.$inject = PostDisplayControllerInjectables;