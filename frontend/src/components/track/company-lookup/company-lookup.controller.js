let companyLookupControllerInjectables = ['$scope', '$timeout', '$q', 'companyLookupService', 'countries', 'usaStates', 'usaCities', 'usaStateBounds', 'NgMap', 'apiKey', 'GoogleMapsApi', 'CompanyLookupGoogleService'];

export default class companyLookupController {
    constructor($scope, $timeout, $q, companyLookupService, countries, usaStates, usaCities, usaStateBounds, NgMap, apiKey, GoogleMapsApi, CompanyLookupGoogleService) {
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$q = $q;

        this.countries = countries;
        this.usaStates = usaStates;
        this.usaStateBounds = usaStateBounds;
        this.usaCities = usaCities;


        this.CompanyLookupGoogleService = CompanyLookupGoogleService;
        this.companyLookupService = companyLookupService;
        this.modal = false;
        this.companySearch = '';
        this.companies = [];
        this.noNameSelected = true;
        this.doCache = true;
        this.tempCache = [];
        this.noResults = false;
        this.loading = false;

        this.filterCountry = undefined;
        this.filterUsaCity = undefined;
        this.filterUsaState = undefined;
        this.filterText = undefined;
        this.countrySelectables = false;
        this.stateSelectables = false;
        this.fuzzyOptions = {
            includeScore: true,
            threshold: 0.6,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: ['country_code']
        };

        //=========================== Lookup/Map Variables ====================
        this.apiKey = apiKey;
        this.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=" + this.apiKey + '&libraries=geometry,places';
        this.ngMap = NgMap;
        this.googleLoaded = false;
        this.map = {};
        this.GoogleMapsApi = GoogleMapsApi;
        this.autocomplete = {};

        //======================================================================


        this.$scope.$on('cacheWait', () => {
            this.$timeout(() => {
                this.doCache = true;
            }, 750)
        });

    }  // constructor closing bracket


    $onInit() {
        if (this.resolve) {
            this.modal = true;
        }
        console.log(this.$scope);
        //=========== CHECK FOR GOOGLE JS API IN THE GLOBAL SCOPE ===================
        this.CompanyLookupGoogleService.checkForGoogleLoaded()
            .then((response) => {
            console.log('this.CompanyLookupGoogleService.checkForGoogleLoaded', response);
                this.googleLoaded = true;
                this.setupGoogleAutocomplete();
            })


        //=========================== Beta/Tentative Code ====================
        //======================================================================
    }

    //=========================== Lookup/Map Code ====================

    setupGoogleAutocomplete() {
        if (this.googleLoaded) {
            var defaultBounds = new google.maps.LatLngBounds(
                new google.maps.LatLng(-90, 180),
                new google.maps.LatLng(90, 180));
            var input = document.getElementById('companyModalSearch');
            var options = {
                bounds: defaultBounds
                //       componentRestrictions: {country: 'us'},
                //       types: ['establishment']
            };

            this.autocomplete = new google.maps.places.Autocomplete(input, options);
            this.autocomplete.addListener('place_changed', () => {
                // todo need a loading/spinner animation
                let parsePlace = this.companyLookupService.getLocationDetails(this.autocomplete.getPlace(), this.companySearch);
                this.loading = true;
                this.overlay = '';
                parsePlace
                    .then((response) => {
                        this.close({$value: response})
                    })
                    .catch((error) =>{
                        this.loading = false;
                    console.log('getLocationDetails Error', error);
                    })
            })
        }
    }

    //=========================== Restrict Results Code ====================
    restrictToState(value) {
        if(value) {
            if (value.hasOwnProperty('abbreviation')) {
                console.log('restrict state value:', value);
                let states = Object.keys(this.usaStateBounds);
                if (states.indexOf(value.name) > -1) {
                    let boundsArray = this.usaStateBounds[value.name].boundingbox;
                    console.log(boundsArray);
                    let newBounds = new google.maps.LatLngBounds(
                        new google.maps.LatLng(boundsArray[0], boundsArray[2]),
                        new google.maps.LatLng(boundsArray[1], boundsArray[3]));
                    this.autocomplete.setBounds(newBounds);
                    this.autocomplete.setOptions({strictBounds: true})
                }
            }
        }
    }

    restrictToCountry(value) {
        console.log('restrict country RAW value:', value);
        if(value){
            if (value.hasOwnProperty('code')) {
                console.log('restrict country value:', value);
                let country = value.code.toLowerCase();

                this.autocomplete.setComponentRestrictions({'country': country});
            }
        }


        //  this.autocomplete.setComponentRestrictions(
    }


}


companyLookupController.$inject = companyLookupControllerInjectables;