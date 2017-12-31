let LocationParserServiceInjectables = [ '$q', 'LocationRequestsService', 'ParseGoogleService', 'locationDefault'];


export class LocationParserService {
    constructor($q, LocationRequestsService, ParseGoogleService, locationDefault) {
        this.$q = $q;
        this.RequestsService = LocationRequestsService;
        this.ParseGoogleService = ParseGoogleService;
        this.locationDefault =  locationDefault;
    }



    getCoordinates(address) {
        return this.$q((resolve, reject) => {
            this.RequestsService.getCoordinates(address)
                .then((response) => {
                    console.log('reverseGeoCode Response', response);
                    resolve(this.ParseGoogleService.parseAddress(response))
                })
                .catch((error) => {
                    console.log('[location-parser.service] getCoordinates ERROR:', error);
                    resolve(this.locationDefault)
                })
        })
    }

    parseGoogleAddress(address){
        return this.ParseGoogleService.parseAddress(address)
    }

}

LocationParserService.$inject = LocationParserServiceInjectables;




