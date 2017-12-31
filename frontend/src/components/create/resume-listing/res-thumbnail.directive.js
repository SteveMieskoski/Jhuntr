/*'use strict';

(function(angular){
    "use strict";
    angular.module('creator')
        .component('resThumbnail', {
            bindings:{
                thumbHost: '<',
                thumbRef: '<'
            },
           // template: '  <iframe ng-if="$ctrl.requestSuccess" class="listing-thumb" ng-src="{{$ctrl.srcRef}}"></iframe>',
            template: '  <div class="listing-thumb" ng-bind-html="$ctrl.thumbSource"></div>',
            controller: resThumbnailController});

    resThumbnailController.$inject = ['$http', '$sce'];

    function resThumbnailController($http, $sce){
        var vm = this;
        vm.requestSuccess = false;
        vm.$onInit = function(){
            vm.srcRef = vm.thumbHost + '/public/temp/' + vm.thumbRef + 'resume.html';
            $http.get(vm.srcRef).then(function(response){
                console.log(response);
                if(response){
                   // var source = response.data.replace(/zoom: 0.65;/, function(match){
                    //    console.log('regex match', match);
                    //    return 'zoom: 1.53;';
                   // });
                    vm.thumbSource = $sce.trustAsHtml(response.data );
                   // vm.requestSuccess = true;
                }
              //  vm.thumbnail = response.data;
            });
        }


        //class="listing-thumb"
        // ng-bind-html="response"

    }

})(angular);
    */