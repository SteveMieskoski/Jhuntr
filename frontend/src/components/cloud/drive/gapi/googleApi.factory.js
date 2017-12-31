

// note: I could likely move all this into a run block



googleApiFactory.$inject = ['$rootScope', 'store', 'gConstants', '$window', '$q'];

export function googleApiFactory($rootScope, store, gConstants, $window, $q){

    var googleApi = $q.defer();

    $window.init_gapi = function() {
        $rootScope.$apply(function() {
            var apis = [];
            if (gConstants.apiKey) {
                $window.gapi.client.setApiKey(gConstants.apiKey);
            }

           window.angular.forEach(gConstants.discoveryDocs.drive, function(value) {
                console.log(window.gapi);
                apis.push($q.when($window.gapi.client.load(value)));
            });
            $q.all(apis).then(function() {
                googleApi.resolve($window.gapi);
            });

            googleApi.resolve($window.gapi);
        });
    };

    return googleApi.promise;
}

