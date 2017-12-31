let LocationRequestsServiceInjectables = ['$http'];

export class LocationRequestsService{
	constructor($http){
        this._$http = $http;
	}

    getCountry() {
        return this._$http.get('http://ip-api.com/json');
    }

    getCoordinates(address){
        return this._$http.get('https://maps.googleapis.com/maps/api/geocode/json', {params: {address: address, key: 'AIzaSyA-91OiLnBM4rwzDnCgpWJLYwdkhU4mhDA'}})
            .then((response) =>{
                return Promise.resolve(response.data.results);
            })
            .catch((error) =>{
                console.log('google reverse geocode error:', error);
            })
    }
}

LocationRequestsService.$inject = LocationRequestsServiceInjectables;