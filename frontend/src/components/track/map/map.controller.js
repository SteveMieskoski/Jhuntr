let MapControllerInjectables = ['apiKey', 'NgMap', '$timeout', 'MapService', '$q'];


export default class MapController {
    constructor(apiKey, NgMap, $timeout, MapService, $q) {
        this.$timeout = $timeout;
        this.MapService = MapService;
        this.$q = $q;
        this.apiKey = apiKey;
        this.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=" + this.apiKey + '&libraries=geometry,places';
        this.ngMap = NgMap;
        this.map = {};
        this.types = "['establishment']";
        // this.ngMap.getMap().then((map) => {
        //    this.map = map;
        //  });
        this.showMap = null;
        this.markerList = [];
        this.companyName = '';

        //=========================== Experimental/Dev Variables ====================


        //======================================================================
    }

    //=========================== Experimental/Dev Code ====================


    //======================================================================

    $onInit() {

        if(window.google){
            console.log('google maps loaded');
            this.mapDisplay(this.selectMap)
                .then((selection) => {
                    this.showMap = selection.display;
                })
                .catch((noSelection) => {

                })
        } else {
            this.mapDisplay(this.selectMap)
                .then((selection) => {
                    this.showMap = selection.display;
                    this.setupMap(selection.setup)
                        .then(() => {

                        })
                        .catch((error) => {
                            console.log(error);
                        })
                })
                .catch((noSelection) => {
                    console.log(noSelection);
                })
        }


    }




    setupMap(vars) {
        let defaultVars = {setupFunction: (mapInstance) => {return mapInstance}, options: null};
        vars = vars || {};
        vars = Object.assign({}, defaultVars, vars);
        return this.$q((resolve, reject) => {
            this.ngMap.getMap().then((mapInstance) => {
                // vm.map = mapInstance;
                // The line above is enough but if you are using ui-router
                // maybe the code below is necessary
                var center = mapInstance.getCenter();

                google.maps.event.trigger(mapInstance, 'resize');
                mapInstance.setCenter(center);
                this.$timeout(() => {
                    console.log(this.markerList.length);
                    vars.setupFunction(mapInstance);
                    this.map = mapInstance;
                    resolve(mapInstance);
                });
            }, (error) =>{
                    console.log(error);
                })
                .catch((error) =>{
                    console.log(error);
                })
        })
    }


    configMap(vars){
        let defaultVars = {};
        vars = vars || {};
        vars = Object.assign({}, defaultVars, vars);
    }


    mapDisplay(selectMap) {
        return this.$q((resolve, reject) => {
            switch (selectMap) {
                case 'singleCompany':
                    if(this.companyLat && this.companyLong){
                        resolve({display:'single-coord', setup: {}});
                    } else {
                        resolve({display:'single', setup: {}});
                    }

                    break;
                case 'singleCompany-logo':
                    if(this.companyLat && this.companyLong){
                        resolve({display:'single-logo-coord', setup: {}});
                    } else {
                        resolve({display:'single-logo', setup: {}});
                    }

                    break;
                case 'allTargets':
                    this.companiesParse(this.companiesList)
                        .then((markers) => {
                            console.log('markers', markers);
                            if(markers.length > 0){
                                let companiesSetup = (mapInstance) =>{
                                    let bounds = new google.maps.LatLngBounds();
                                    for (let i=0; i<markers.length; i++) {
                                        console.log('A Marker', markers[i]);
                                        let latlng = new google.maps.LatLng(markers[i].coords[0], markers[i].coords[1]);
                                        bounds.extend(latlng);
                                    }
                                    mapInstance.setCenter(bounds.getCenter());
                                    mapInstance.fitBounds(bounds);
                                };
                                this.markerList = markers;
                                resolve({display:'all', setup: {setupFunction: companiesSetup}});
                            } else {
                                reject();
                            }
                        });
                    break;
                default:
                    console.log('break');
                    reject();
                    break;
            }
        })
    }

    allTargetsSetup(resolve, reject){

    }


    companiesParse(companies) {
        return this.$q((resolve, reject) => {
            let markerList = [];

            for (let j = 0; j < companies.length; j++) {
                let entry = {};
                let hasCoords = (companies[j].lat && companies[j].long);
                if (companies[j].company) {
                    entry.name = companies[j].company;
                }
               if (companies[j].company_address && !hasCoords) {
                    entry.address = companies[j].company_address;
                } else if (companies[j].location) {
                    entry.address = companies[j].location;
                } else if (companies[j].city) {
                    entry.address = companies[j].city;
                } else if (companies[j].state) {
                    entry.address = companies[j].state;
                }

                if (hasCoords) {
                    entry.coords = [companies[j].lat, companies[j].long];
                }

                if(companies[j].logo){
                    entry.logo = companies[j].logo;
                } else {
                    entry.logo = 'location-placeholder.png';
                }

                if ((entry.hasOwnProperty('address') || entry.hasOwnProperty('coords'))&& entry.hasOwnProperty('logo')) {
                    console.log('entry added:', entry);
                    markerList.push(entry);
                }

            }


            console.log('markerList', markerList);
            resolve(markerList);
        })
    }


    companyInfoWebLogo() {
        this.MapService.getCompanyDomainAndLogo(this.companyName)
            .then((response) => {
                console.log(response);
                this.companyLogo = response.data;
            })
            .catch((err) => {
                console.log(err);
            })
    }


}


MapController.$inject = MapControllerInjectables;