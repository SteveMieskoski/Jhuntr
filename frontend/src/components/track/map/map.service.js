let GoogleMapServiceInjectables = ['GoogleMapsApi', '$http'];

import {MarkerClusterer} from '../../../../vendor/markerClusterer.js';

export class GoogleMapService{
	constructor(GoogleMapsApi, $http){
	    this.GoogleMapsApi = GoogleMapsApi;
	    this.$http = $http;
	}

	clusterMarkers(map, mapMarkers){
		console.log(MarkerClusterer);
        let clusterImage = 'https://raw.githubusercontent.com/googlemaps/js-marker-clusterer/gh-pages/images/m';
        return new  MarkerClusterer(map, mapMarkers, {imagePath: clusterImage});
	}

	servDemo(){
         new window.google.maps.LatLng(0, 0);
    }


    getCompanyDomainAndLogo(co){
	   return this.$http.get('https://autocomplete.clearbit.com/v1/companies/suggest?query=' + co);
    }
}

GoogleMapService.$inject = GoogleMapServiceInjectables;