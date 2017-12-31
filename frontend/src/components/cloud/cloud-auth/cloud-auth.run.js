


CloudAuthRun.$inject =['$rootScope', 'store', 'CloudAuth0', '$window', '$q'];

export function CloudAuthRun($rootScope, store, cloudAuth0, $window, $q) {

    var googleApi = $q.defer();

    $window.init_gapi = function() {
        $rootScope.$apply(function() {
            var apis = [];
            if (apiKey) {
                $window.gapi.client.setApiKey(apiKey);
            }
            angular.forEach(loadApis, function(value, key) {
                apis.push($q.when(gapi.client.load(key, value)));
            });
            $q.all(apis).then(function() {
                googleApi.resolve($window.gapi);
            });
        });
    };

    return googleApi.promise;
}


/*
 if($rootScope.Authenticate && $rootScope.authorizingCloud){
 console.log('NOT AUTHENTICATED ---------------------- DEV CHECK: CLOUD-AUTH.RUN');
 }

 var cloudAuth = store.get('cloudAuth');
 if(!$rootScope.Authenticate){
 console.log('NOT AUTHENTICATED ---------------------- DEV CHECK: CLOUD-AUTH.RUN');
 }
 if(cloudAuth === true){
 cloudAuth0.authenticateAndGetProfile();
 //  console.log('NOT CLOUD AUTH  ---------------------- DEV CHECK');
 console.log('CLOUD AUTH  ---------------------- DEV CHECK: CLOUD-AUTH.RUN');
 window.angular.element(() => {store.remove('cloudAuth');});

 } else {
 // AuthService.authenticateAndGetProfile();
 //authManager.checkAuthOnRefresh();
 console.log('NOT CLOUD AUTH  ---------------------- DEV CHECK: CLOUD-AUTH.RUN');
 }


 function RemoveCloudAuthCheck(){
 console.log('CLOUD-AUTH.RUN WINDOW.ONLOAD');

 }
 */