let CompanyLookupServiceInjectables = ['$http', '$sce', 'CloudDataService', '$uibModal', 'FuzzySearch', '$q'];

export class CompanyLookupService {
    constructor($http, $sce, CloudDataService, $uibModal, FuzzySearch, $q) {
        this.FuzzySearch = FuzzySearch;
        this.CloudDataService = CloudDataService;
        this._$uibModal = $uibModal;
        this._$http = $http;
        this._$sce = $sce;
        this._$q = $q;
        this.urlBase = 'http://api.opencorporates.com/companies/search';

    }

    getLogosAndDomains(companyName){
        return this._$http.get('https://autocomplete.clearbit.com/v1/companies/suggest?query=' + companyName);
    }

    getCompanyDetails(domain, name){
        if(domain){
            return this.CloudDataService.companyLookup(domain, null)
        } else {
            return this.CloudDataService.companyLookup(null, name)
        }

    }




    fuzzySearchCompanyResults(results, companyName){
        let options = {
            //includeScore: true,  // causes each return item to be wrapped in an pbject with the 'result' and 'score' on the same level.
            shouldSort: true,
            threshold: 0.6,
            maxPatternLength: companyName.length,
            minMatchCharLength: Math.round(companyName.length/3),
            keys: ['company_name']
        };

        let fuzzy = this.FuzzySearch.Fuse(results, options);
        let primaryResults = fuzzy.search(companyName);


    }


    fuzzySearchLogoResults(results, companyName){
        let optionsLogo = {
            //includeScore: true,  // causes each return item to be wrapped in an pbject with the 'result' and 'score' on the same level.
            threshold: 0.2,
            shouldSort: true,
            caseSensitive: false,
            //  tokenize: true,
            maxPatternLength:  companyName.length,
            minMatchCharLength: 2,
            keys: [{
                name: 'name',
                weight: 0.7
            }, {
                name: 'domain',
                weight: 0.3
            }]
        };
    }


    parseLookupResults(response, companyName){
        console.log('company lookup response', response[0]);



        // console.log(primaryResults);
        console.log('logo results', response[1].data[0]);
        this.byCountry = response[0].countries;

        /*    // Refining the logo Results was not producing satisfactory results.  Just going to wing it for the moment. (with option to correct if the choice is wrong)
         let fuzzyLogo = this.FuzzySearch.Fuse(response[1].data,  optionsLogo);
         let company = fuzzyLogo.search(companyName);
         */

        return {
            primaryResults: primaryResults,
            likelyName: response[1].data[0].name,
            likelyDomain: response[1].data[0].domain,
            likelyLogo: response[1].data[0].logo
        }
    }



}