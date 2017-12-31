let CompanyLookupServiceInjectables = ['$http', '$sce', 'CloudDataService', '$uibModal', 'FuzzySearch', 'LocationParserService'];


export class CompanyLookupService {
    constructor($http, $sce, CloudDataService, $uibModal, FuzzySearch, LocationParserService) {
        this.FuzzySearch = FuzzySearch;
        this.CloudDataService = CloudDataService;
        this._$uibModal = $uibModal;
        this._$http = $http;
        this._$sce = $sce;
        this.LocationParser = LocationParserService;
        this.urlBase = 'http://api.opencorporates.com/companies/search';

    }


    getCountry() {
        return this._$http.get('http://ip-api.com/json');
    }

    getCoordinates(address) {
        return this.LocationParser.getCoordinates(address);
    }

    parseGoogleAddress(address) {
        return this.LocationParser.parseGoogleAddress(address);
    }

    companyNameAutoComplete(companyName) {
        return this._$http.get('https://autocomplete.clearbit.com/v1/companies/suggest?query=' + companyName)
            .then((response) => {
                return response.data;
            })
            .catch((error) =>{
            console.log('companyNameAutoComplete ERROR:', error);
            })
    }

    companyLogo(domain) {
        return this._$http.get('https://logo.clearbit.com/' + domain);
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

    getLocationDetails(place, companySearch) {
        console.log('companySearch', companySearch);

        //   var place = this.autocomplete.getPlace();
        console.log(place);
        console.log(place.geometry.location.lat());
        console.log(place.geometry.location.lng());
        let detailedLocation = this.parseGoogleAddress(place);
        // let detailedLocation = this.parseAddressGoogle(place);
        if (place.website) {
           return this.getDetailsUsingUrl(place, detailedLocation, companySearch)
        } else {
           return this.getDetailsFromNameAndQuery(place, detailedLocation, companySearch)
        }
    }

    getDetailsUsingUrl(place, detailedLocation, companySearch) {
        return new Promise((resolve, reject) => {
            let logo, website, companyFlair, urlParts;
            website = place.website;
            const regex = /(http\w?:\/\/www*\.*|http\w?:\/\/\.*).*?(?:\/)/g;
            let urlBase = place.website.match(regex);
            console.log(urlBase);
            urlParts = urlBase[0].split('.');
            console.log(urlParts);
            let tld = urlParts[urlParts.length - 1].replace('/', '');
            console.log(urlParts, urlParts[urlParts.length - 2] + '.' + tld);
            let domain = urlParts[urlParts.length - 2] + '.' + tld;
            logo = 'https://logo.clearbit.com/' + domain;
            this.companyNameAutoComplete(domain)
                .then((response) => {
                    console.log('logoResponse', response);

                    let selectedCompany = {
                        detailedLocation: detailedLocation,
                        company: response[0].name, //company,
                        logo: response[0].logo ? response[0].logo : logo, // this.selectedLogo,
                        url: response[0].domain ? response[0].domain : website, // this.selectedDomain,  <-- can get url/website from location autocomplete return object
                    };
                    resolve(selectedCompany)
                })
                .catch((error) => {
                    console.log('Logo Search ERROR:', error);
                    let selectedCompany = {
                        detailedLocation: detailedLocation,
                        company: companySearch, //company,
                        logo: logo, // this.selectedLogo,
                        url: website, // this.selectedDomain,  <-- can get url/website from location autocomplete return object

                    };
                    resolve(selectedCompany)
                })
        })

    }

    getDetailsFromNameAndQuery(place, detailedLocation, companySearch) {
        return new Promise((resolve, reject) => {
            this.inspectForName(place.name, companySearch)
                .then((response) => {
                        let selectedCompany = {
                            detailedLocation: detailedLocation,
                            company: response.name, //company,
                            logo: response.logo, // this.selectedLogo,
                            url: response.domain, // this.selectedDomain,  <-- can get url/website from location autocomplete return object

                        };
                        resolve(selectedCompany)
                })
                .catch((error) => {
                        let selectedCompany = {
                            detailedLocation: detailedLocation,
                            company: companySearch, //company,
                        };
                        resolve(selectedCompany)
                })
        })
    }

    inspectForName(gName, query) {
        return new Promise((resolve, reject) => {
            console.log(gName);
            let nameSearch = gName.split(/\s/);
            console.log(nameSearch);
            let terms = [];
            //terms.push({name: query});
            for (let i = 0; i < nameSearch.length; i++) {
                if (nameSearch.length > i + 1) {
                    terms.push({name: nameSearch[i] + ' ' + nameSearch[i + 1]})
                }
                if (i > 0 && nameSearch.length > i + 1) {
                    terms.push({name: nameSearch[i - 1] + ' ' + nameSearch[i] + ' ' + nameSearch[i + 1]})
                }
                terms.push({name: nameSearch[i]})
            }
            console.log(terms);
            console.log('fuxxy search', this.parseLookupResults(terms, query));
            let results = this.parseLookupResults(terms, query);
            if (results.length > 0) {
                let encoded = encodeURIComponent(results[0].item.name);
                this.companyNameAutoComplete(encoded)
                    .then((response) => {
                        console.log('logo search 2 response', response);
                        console.log('fuxxy search 2', this.parseLookupResults(response, results[0].item.name));
                        results = this.parseLookupResults(response, results[0].item.name);
                        if (results[0].score < .1) {
                            resolve(results[0].item);
                        }
                        reject();
                    })
                    .catch((error) => {
                        reject();
                    })
            } else {
                reject();
            }
        })
    }


}

CompanyLookupService.$inject = CompanyLookupServiceInjectables;