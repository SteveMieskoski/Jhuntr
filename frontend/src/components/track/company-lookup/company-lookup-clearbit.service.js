let CompanyLookupClearbitServiceInjectables = ['$scope', '$timeout', '$q', 'companyLookupService', 'countries', 'usaStates', 'usaCities', '$http'];

export class CompanyLookupClearbitService{
    constructor($scope, $timeout, $q, companyLookupService, countries, usaStates, usaCities, $http) {
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$q = $q;
        this.$http = $http;

        this.countries = countries;
        this.usaStates = usaStates;
        this.usaCities = usaCities;


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


    }


    companyLookupClearbit(companyName) {
        this.companyLookupService.companyNameAutoComplete(companyName).then((response) => {
            console.log('companyNameAutoComplete', response);
            this.resultList = response.data;
        })
    }

    displayDetailsSearch(name) {
        this.companyLookupService.getLogosAndDomains(name)
            .then((response) => {
                this.companies = response.data;
            })
    }

}

CompanyLookupClearbitService.$inject = CompanyLookupClearbitServiceInjectables;