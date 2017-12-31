let companyLookupControllerInjectables = ['$scope', '$timeout', '$q', 'companyLookupService', 'countries', 'usaStates', 'usaCities',  'NgMap', 'apiKey'];

export default class companyLookupController {
    constructor($scope, $timeout, $q, companyLookupService, countries, usaStates, usaCities, NgMap, apiKey) {
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.countries = countries;
        this.usaStates = usaStates;
        this.usaCities = usaCities;
        this.apiKey = apiKey;
        this.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=" + this.apiKey + '&libraries=geometry,places';
        this.ngMap = NgMap;
        this.$q = $q;
        this.companyLookupService = companyLookupService;
        this.modal = false;
        this.companySearch = '';
        this.companies = [];
        this.noNameSelected = true;
        this.doCache = true;
        this.tempCache = [];
        this.noResults = false;

        this.filterCountry = {name: 'United States', code: 'US'};
        this.filterUsaCity = undefined;
        this.filterUsaState = undefined;
        this.filterText = undefined;
        this.fuzzyOptions = {
            includeScore: true,
            threshold: 0.6,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: ['country_code']
        };

        this.$scope.$on('cacheWait', () => {
            this.$timeout(() =>{
                this.doCache = true;
            }, 750)
        });


    }



    $onInit() {
        if (this.resolve) {
            this.modal = true;
        }
        if(window.google){
            console.log('google maps loaded');
        } else {
            this.setupGoogleMaps()
                .then((response) => {
                console.log('google maps should be ready');
                })
        }
    }

    setupGoogleMaps(){
        return this.$q((resolve, reject) => {
            this.ngMap.getMap().then((mapInstance) => {
                    // vm.map = mapInstance;
                    // The line above is enough but if you are using ui-router
                    // maybe the code below is necessary
                    var center = mapInstance.getCenter();
                    vars.setupFunction(mapInstance);
                    google.maps.event.trigger(mapInstance, 'resize');
                    mapInstance.setCenter(center);
                    this.$timeout(() => {
                        this.map = mapInstance;
                        resolve(mapInstance);
                    });
                })
                .catch((error) =>{
                    console.log(error);
                })
        })
    }

    fuzzyOptionFunc(keys){
        if(!keys) keys = 'company_name';
        return {
            includeScore: true,
            threshold: 0.6,
            maxPatternLength: 32,
            minMatchCharLength: 2,
            keys: [keys]
        }
    };

    runSearch(input) {
        this.companyLookupService.doSearch(input)
            .then((response) => {
                this.companies = response;
            })
            .catch((error) => {
                console.log('company lookup error', error);
            })
    }

    cityFilter(countryFilter, stateFilter, cityFilter){
        let rawResult = this.companyLookupService.cityFilter(this.resultList, countryFilter, stateFilter, cityFilter);
        console.log('rawResult', rawResult);
        this.resultList = rawResult;
    }



    companyLookup(companyName){
        this.companyLookupService.companyNameAutoComplete(companyName).then((response) => {
            console.log('companyNameAutoComplete',response);
            this.resultList = response.data;
        })
    }

    publicCompanyLookup(companyName){
        if(this.doCache){
            let queries = [this.companyLookupService.getCompanyDetails(null, companyName), this.companyLookupService.companyNameAutoComplete(companyName)];
            Promise.all(queries)
                .then((response) => {
                    console.log('company Lookup Raw Response:', response);
                    /*if(response.data.hasOwnProperty('error')){
                     console.log(response);
                     this.noResults = true;
                     return
                     }*/
                    if(response[0].exists){
                        console.log('RAW LOOKUP RESPONSE', response[0]);
                        this.doCache = false;
                        this.$scope.$emit('cacheWait');
                        this.tempCache = response[0].parentCompanies;
                        this.resultList = this.companyLookupService.parseLookupResults(response[0].parentCompanies, companyName);
                        if(this.resultList.length === 0){
                            this.resultList = this.companyLookupService.parseLookupResults(response[0].subsidiaries , companyName);
                            if(this.resultList.length === 0){
                                console.log('no results found.....?????????')
                            }
                        }
                        let parsedLogoResults = this.companyLookupService.parseLookupLogoResults(response[1], companyName);
                        this.selectedAltName = parsedLogoResults.likelyName;
                        this.selectedLogo = parsedLogoResults. likelyLogo;
                        this.selectedDomain = parsedLogoResults.likelyDomain;
                        this.logoResponse = parsedLogoResults.logoResponse;
                    }

                })
                .catch((error) => {
                    this.noResults = true;  // just bucket every error here ...
                    console.log('company lookup error', error);
                })
        } else {
            this.resultList = this.companyLookupService.secondLook(this.tempCache, companyName);
        }
    }

    nameSelected(company) {

        this.noNameSelected = false;
        this.selectedName = company.name;
        this.getCoordinates(company.raw_address)
            .then((response) => {
                let selectedCompany;
                console.log('reverseGeoCode Response', response);
                if (this.modal) {
                    selectedCompany = {detailedLocation: response, company: company, logo: this.selectedLogo, url: this.selectedDomain, altName: this.selectedAltName};
                    this.close({$value: selectedCompany})
                } else {
                    this.companySelected({company: company})
                }
            })
    }

    getCoordinates(address){
        let detailedLocation ={lat: null, long: null, address: null, number: null, street: null, city: null, region: null, state: null, country: null, zip: null };
        return this.$q((resolve, reject) => {
            this.companyLookupService.getCoordinates(address)
                .then((response) => {
                    console.log('reverseGeoCode Response', response);
                    detailedLocation.lat = response.data.results[0].geometry.location.lat;
                    detailedLocation.long = response.data.results[0].geometry.location.lng;
                    detailedLocation.address = response.data.results[0].formatted_address;
                    let components = response.data.results[0].address_components;
                    for(let i =0; i<components.length; i++){
                        for(let j=0; j<components[i].types.length; j++){
                            switch(components[i].types[j]){
                                case 'street_number':
                                    detailedLocation.number = components[i].short_name;
                                    break;
                                case 'route':
                                    detailedLocation.street = components[i].short_name;
                                    break;
                                case "locality":
                                    detailedLocation.city = components[i].short_name;
                                    break;
                                case "administrative_area_level_2":
                                    detailedLocation.region = components[i].short_name;
                                    break;
                                case "administrative_area_level_1":
                                    detailedLocation.state = components[i].short_name;
                                    break;
                                case "country":
                                    detailedLocation.country = components[i].short_name;
                                    break;
                                case "postal_code":
                                    detailedLocation.zip = components[i].short_name;
                                    break;

                            }
                        }
                    }
                    resolve(detailedLocation)
                })
                .catch((error) =>{
                    console.log('company-lookup.controller getCoordinates ERROR:', error);
                    resolve(detailedLocation)
                })
        })

    }

    nameSelectedOpenData(name, location) {
        this.noNameSelected = false;
        this.name = name;
        this.location = location;
    }


    displayDetailsSearch(name) {
        this.companyLookupService.getLogosAndDomains(name)
            .then((response) => {
                this.companies = response.data;
            })
    }

}


companyLookupController.$inject = companyLookupControllerInjectables;