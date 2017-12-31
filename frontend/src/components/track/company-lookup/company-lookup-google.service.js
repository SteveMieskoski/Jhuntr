let CompanyLookupGoogleServiceInjectables = ['$timeout', '$q', 'companyLookupService', 'countries', 'usaStates', 'usaCities', 'usaStateBounds', 'NgMap', 'apiKey', 'GoogleMapsApi'];

export class CompanyLookupGoogleService{
	constructor( $timeout, $q, companyLookupService, countries, usaStates, usaCities, usaStateBounds, NgMap, apiKey, GoogleMapsApi){
        this.$timeout = $timeout;
        this.countries = countries;
        this.usaStates = usaStates;
        this.usaStateBounds = usaStateBounds;
        this.usaCities = usaCities;

        this.$q = $q;
        this.companyLookupService = companyLookupService;

        //=========================== Lookup/Map Variables ====================
        this.apiKey = apiKey;
        this.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=" + this.apiKey + '&libraries=geometry,places';
        this.ngMap = NgMap;
        this.googleLoaded = false;
        this.map = {};
        this.GoogleMapsApi = GoogleMapsApi;
        this.autocomplete = {};

        //======================================================================
	}


    checkForGoogleLoaded(returnPromise) {
        return new Promise((resolve, reject) => {
            if (window.google === undefined || window.google.maps === undefined) {
                this.GoogleMapsApi.load(this.googleMapsUrl);
                this.$timeout(() => {
                    if (window.google === undefined || window.google.maps === undefined) {
                        console.log('GOOGLE NOT LOADED');
                        resolve(this.checkForGoogleLoaded());

                    } else {
                        console.log('GOOGLE LOADED');
                        this.googleLoaded = true;
                        resolve(true);
                        //this.setupGoogleAutocomplete();
                    }
                }, 100)
            } else {
                this.$timeout(() => {
                    console.log('GOOGLE LOADED');
                    this.googleLoaded = true;
                    resolve(true);
                    //this.setupGoogleAutocomplete();
                }, 100)
            }
        })

    }

    googlePolling(resolve) {
            if (window.google === undefined || window.google.maps === undefined) {
                this.GoogleMapsApi.load(this.googleMapsUrl);
                this.$timeout(() => {
                    if (window.google === undefined || window.google.maps === undefined) {
                        console.log('GOOGLE NOT LOADED');
                        this.checkForGoogleLoaded();
                    } else {
                        console.log('GOOGLE LOADED');
                        this.googleLoaded = true;
                        this.setupGoogleAutocomplete();
                    }
                }, 100)
            } else {
                this.$timeout(() => {
                    console.log('GOOGLE LOADED');
                    this.googleLoaded = true;
                    this.setupGoogleAutocomplete();
                }, 100)
            }

    }

}

CompanyLookupGoogleService.$inject = CompanyLookupGoogleServiceInjectables;