let ParseGoogleServiceInjectables = ['$http', '$sce', '$q', 'locationDefault'];


export class ParseGoogleService {
    constructor($http, $sce, $q, locationDefault) {
        this.$q = $q;
        this._$http = $http;
        this._$sce = $sce;
        this.locationDefault = locationDefault;



    }


    parseAddress(rawAddress) {
        let parsed = window.angular.copy(this.locationDefault);
        let components, location;
        if (Array.isArray(rawAddress)) {
            location = rawAddress[0];
            components = location.address_components
        } else {
            location = rawAddress;
            components = rawAddress.address_components
        }
        parsed.address = location.formatted_address;
        if (typeof location.geometry.location.lat === "function" && typeof location.geometry.location.lng === "function") {
            parsed.lat = location.geometry.location.lat();
            parsed.long = location.geometry.location.lng();
        } else {
            parsed.lat = location.geometry.location.lat;
            parsed.long = location.geometry.location.lng;
        }

        for (let i = 0; i < components.length; i++) {
            for (let j = 0; j < components[i].types.length; j++) {
                switch (components[i].types[j]) {
                    case 'street_number':
                        parsed.number = components[i].short_name;
                        break;
                    case 'route':
                        parsed.street = components[i].short_name;
                        break;
                    case "locality":
                        parsed.city = components[i].short_name;
                        break;
                    case "administrative_area_level_2":
                        parsed.region = components[i].short_name;
                        break;
                    case "administrative_area_level_1":
                        parsed.state = components[i].short_name;
                        break;
                    case "country":
                        parsed.country = components[i].short_name;
                        break;
                    case "postal_code":
                        parsed.zip = components[i].short_name;
                        break;

                }
            }
        }
        return parsed;
    }

}

ParseGoogleService.$inject = ParseGoogleServiceInjectables;