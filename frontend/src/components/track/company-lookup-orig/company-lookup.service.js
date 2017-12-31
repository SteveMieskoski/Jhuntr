let CompanyLookupServiceInjectables = ['$http', '$sce', 'CloudDataService', '$uibModal', 'FuzzySearch'];


export class CompanyLookupService {
    constructor($http, $sce, CloudDataService, $uibModal, FuzzySearch) {
        this.FuzzySearch = FuzzySearch;
        this.CloudDataService = CloudDataService;
        this._$uibModal = $uibModal;
        this._$http = $http;
        this._$sce = $sce;
        this.urlBase = 'http://api.opencorporates.com/companies/search';

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

    getCountry() {
        return this._$http.get('http://ip-api.com/json');
    }

    getCoordinates(address){
            return this._$http.get('https://maps.googleapis.com/maps/api/geocode/json', {params: {address: address, key: 'AIzaSyA-91OiLnBM4rwzDnCgpWJLYwdkhU4mhDA'}})
    }

    cityFilter(resultList, countryFilter, stateFilter, cityFilter){
        let priorFilters = [];
        for(let prop of resultList){
            if(prop.country_code === countryFilter && prop.subdiv_code === stateFilter){
                priorFilters.push(prop);
            }
        }
        let options = {
            threshold: 0.6,
            shouldSort: true,
            caseSensitive: false,
            tokenize: true,
            maxPatternLength: 32,
            minMatchCharLength: 2,
            keys: [
                'raw_address'
            ]
        };

        let fuzzy = this.FuzzySearch.Fuse(priorFilters, options);
        return fuzzy.search(cityFilter);
    }

    parseLookupResults(companiesArray, companyName) {
        let options = {
            shouldSort: true,
            threshold: 0.6,
            maxPatternLength: companyName.length,
            minMatchCharLength: Math.round(companyName.length / 3),
            keys: ['company_name']
        };

        let fuzzy = this.FuzzySearch.Fuse(companiesArray, options);
        let primaryResults = fuzzy.search(companyName);

        return primaryResults;
    }

    parseLookupLogoResults(response, companyName) {

        let optionsLogo = {
            threshold: 0.6,
            shouldSort: true,
            caseSensitive: false,
            tokenize: true,
            maxPatternLength: companyName.length,
            minMatchCharLength: 2,
            keys: [
                'name'
            ]
        };
               /**
         * response[0] structure:
         raw: companyRaw,
         parentCompanies: parentCompanies,
         subsidiaries: subsidiaries,
         countries: countries
         */
        /*    // Refining the logo Results was not producing satisfactory results.  Just going to wing it for the moment. (with option to correct if the choice is wrong)
         let fuzzyLogo = this.FuzzySearch.Fuse(response[1].data,  optionsLogo);
         let company = fuzzyLogo.search(companyName);
         */

        return {
            likelyName: response.data[0].name,
            likelyDomain: response.data[0].domain,
            likelyLogo: response.data[0].logo,
            logoResponse: response.data
        }
    }

    companyNameAutoComplete(companyName) {
        return this._$http.get('https://autocomplete.clearbit.com/v1/companies/suggest?query=' + companyName);
    }

    getCompanyDetails(domain, name) {
        if (domain) {
            return this.CloudDataService.companyLookup(domain, null)
        } else {
            return this.CloudDataService.companyLookup(null, name)
        }

    }


    companyLookupModal() {
        return this._$uibModal.open({
            animation: true,
            size: 'md',
            // backdrop: 'static',
            component: 'companyLookup',
            resolve: {
                modal: () => {
                    return true;
                }
            }
        });
    }

    //=================================================  Possibly Scrap =================================================
    parseResult(result) {
        var companies = result.companies;
        console.log(companies);
        var listing = [];
        for (var i = 0; i < companies.length; i++) {
            if (companies[i].inactive === false) {
                var item = {};
                item.name = companies[i].company.name;
                item.country = companies[i].company.jurisdiction_code;
                item.address = companies[i].company.registered_address;
                console.log(item);
                listing.push(item);
            }
        }
        return listing;
    }

    doSearch(inputs) {
        this._$sce.trustAsResourceUrl(this.urlBase);
        return this.getCountry()
            .then((response) => {
                var jurisdiction_code = response.countryCode;
                return this._$http({
                        method: 'JSONP',
                        url: this.urlBase,
                        params: {
                            q: inputs + '*',
                            fields: 'normalised_name',
                            sparse: true,
                            jurisdiction_code: jurisdiction_code
                        },
                        jsonpCallbackParam: 'callback'
                    })
                    .then((response) => {
                        console.log(response);
                        this.companies = response.data.results.companies;
                        let packageRequests = [];
                        // return this.parseResult(response.data.results);
                        for (let i = 0; i < this.companies.length; i++) {
                            packageRequests.push(this.getLogosAndDomains(this.companies[i].name));
                        }

                        return Promise.all(packageRequests)
                            .then((response) => {
                                for (let i = 0; i < response.length; i++) {
                                    if (response.data) {
                                        this.companies[i]['logo'] = response.data[0];
                                    }
                                }
                                return this.companies;
                            })
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })

    }
}

CompanyLookupService.$inject = CompanyLookupServiceInjectables;