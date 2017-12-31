import controller from "./map.controller.js";
import template from "./map.component.html";

export const MapComponent = {
    bindings:{
        selectMap: '<',
      companyAddress: '<',
        companyLat: "<",
        companyLong: "<",
        companyName: '<',
        companyLogo: '<',
        companiesList: '<'
    },
    template,
    controller
};