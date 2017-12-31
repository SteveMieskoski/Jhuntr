let MapControllerInjectables = ['apiKey', 'NgMap', '$timeout', 'MapService'];

export default class MapController{
    constructor(apiKey, NgMap, $timeout, MapService){
        this.$timeout = $timeout;
        this.MapService = MapService;

        this.apiKey = apiKey;
        this.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=" + this.apiKey + '&libraries=geometry,places';
        this.ngMap = NgMap;
        this.map = {};
        this.types = "['establishment']";
       // this.ngMap.getMap().then((map) => {
       //    this.map = map;
      //  });


        this.companyName = '';
    }

    $onInit(){
        this.ngMap.getMap().then((mapInstance) => {
            // vm.map = mapInstance;
            // The line above is enough but if you are using ui-router
            // maybe the code below is necessary
            var center = mapInstance.getCenter();

            google.maps.event.trigger(mapInstance, 'resize');
            mapInstance.setCenter(center);

            this.$timeout(() => {
                this.map = mapInstance;
            });
        });
    }





    demo(){
        var pyrmont = {lat: -33.867, lng: 151.195};
        var service = new google.maps.places.PlacesService(this.map);
        service.nearbySearch({
            location: pyrmont,
            radius: 500,
            type: ['store']
        }, callback);

        function callback(results, status) {
            console.log(results);
        }
    }

    companyInfoWebLogo(){
        this.MapService.getCompanyDomainAndLogo(this.companyName)
            .then((response) =>{
            console.log(response);
            this.companyLogo = response.data;
            })
            .catch((err) => {
            console.log(err);
            })
    }

    demo2(){
        this.ngMap.getMap().then((map) => {
            console.log(map);
            console.log(map.getCenter());
            console.log('markers', map.markers);
            console.log('shapes', map.shapes);
        });
    }

    placeChanged() {
            this.place = this.getPlace();
            console.log('location', this.place.geometry.location);
            this.map.setCenter(this.place.geometry.location);
    }


}


MapController.$inject = MapControllerInjectables;