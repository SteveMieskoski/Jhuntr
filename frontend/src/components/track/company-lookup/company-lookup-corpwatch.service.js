let CompanyLookupCorpwatchServiceInjectables = ['$scope', '$timeout', '$q', 'companyLookupService', 'countries', 'usaStates', 'usaCities', 'CloudDataService', 'FuzzySearch'];

export class CompanyLookupCorpwatchService {
    constructor($scope, $timeout, $q, companyLookupService, countries, usaStates, usaCities, CloudDataService, FuzzySearch) {
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$q = $q;

        this.countries = countries;
        this.usaStates = usaStates;
        this.usaCities = usaCities;

        this.FuzzySearch = FuzzySearch;
        this.CloudDataService = CloudDataService;
        this.companyLookupService = companyLookupService;
        this.modal = false;
        this.companySearch = '';
        this.companies = [];
        this.noNameSelected = true;
        this.doCache = true;
        this.tempCache = [];
        this.noResults = false;

        this.filterCountry = undefined;
        this.filterUsaCity = undefined;
        this.filterUsaState = undefined;
        this.countrySelectables = false;
        this.stateSelectables = false;


        this.$scope.$on('cacheWait', () => {
            this.$timeout(() => {
                this.doCache = true;
            }, 750)
        });
        //=========================== Experimental/Dev Variables ====================
        // this.modelState = this.ngModel.$dirty

        //======================================================================


    }

  /*  cityFilter(countryFilter, stateFilter, cityFilter) {
        let rawResult = this.companyLookupService.cityFilter(this.resultList, countryFilter, stateFilter, cityFilter);
        console.log('rawResult', rawResult);
        this.resultList = rawResult;
    }*/

    CompanyLookupCorpWatch(companyName) {
        if (this.doCache) {
            let queries = [this.getCompanyDetails(null, companyName), this.companyLookupService.companyNameAutoComplete(companyName)];
            return Promise.all(queries)
                .then((response) => {
                    console.log('company Lookup Raw Response:', response);
                    if (response[0].exists) {
                        console.log('RAW LOOKUP RESPONSE', response[0]);
                        this.doCache = false;
                        this.$scope.$emit('cacheWait');
                        this.tempCache = response[0].parentCompanies;
                        this.resultList = this.companyLookupService.parseLookupResults(response[0].parentCompanies, companyName);
                        if (this.resultList.length === 0) {
                            this.resultList = this.companyLookupService.parseLookupResults(response[0].subsidiaries, companyName);
                            if (this.resultList.length === 0) {
                                console.log('no results found.....?????????')
                            }
                        }
                        let parsedLogoResults = this.companyLookupService.parseLookupLogoResults(response[1], companyName);
                        return {
                            cache: this.doCache, value: {
                                resultList: this.resultList,
                                AltName: parsedLogoResults.likelyName,
                                Logo: parsedLogoResults.likelyLogo,
                                Domain: parsedLogoResults.likelyDomain,
                                logoResponse: parsedLogoResults.logoResponse
                            }
                        }
                    }

                })
                .catch((error) => {
                    this.noResults = true;  // just bucket every error here ...
                    console.log('company lookup error', error);
                })
        } else {
            return {cache: this.doCache, value: this.secondLook(this.tempCache, companyName)};
        }
    }

    getCompanyDetails(domain, name) {
        if (domain) {
            return this.CloudDataService.companyLookup(domain, null)
        } else {
            return this.CloudDataService.companyLookup(null, name)
        }

    }

    secondLook(cache, companyName) {
        let options = {
            threshold: 0.6,
            maxPatternLength: companyName.length,
            minMatchCharLength: Math.round(companyName.length / 3),
            keys: ['company_name']
        };

        let fuzzy = this.FuzzySearch.Fuse(cache, options);
        return fuzzy.search(companyName);
    }

    nameSelected(company) {

        this.noNameSelected = false;
        this.selectedName = company.name;
        this.getCoordinates(company.raw_address)
            .then((response) => {
                console.log('reverseGeoCode Response', response);
                return {
                    detailedLocation: response,
                    company: company,
                    logo: this.selectedLogo,
                    url: this.selectedDomain,
                    altName: this.selectedAltName
                };
            })
    }

    getCoordinates(address) {
        let detailedLocation = {
            lat: null,
            long: null,
            address: null,
            number: null,
            street: null,
            city: null,
            region: null,
            state: null,
            country: null,
            zip: null
        };
        return this.$q((resolve, reject) => {
            this.companyLookupService.getCoordinates(address)
                .then((response) => {
                    console.log('reverseGeoCode Response', response);
                    resolve(this.companyLookupService.parseGoogleAddress(response.data.results))
                })
                .catch((error) => {
                    console.log('company-lookup.controller getCoordinates ERROR:', error);
                    resolve(detailedLocation)
                })
        })

    }


}

CompanyLookupCorpwatchService.$inject = CompanyLookupCorpwatchServiceInjectables;