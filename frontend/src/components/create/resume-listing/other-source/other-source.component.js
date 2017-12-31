import template from "./other-source.component.html"
import controller from "./other-source.controller.js"

export const OtherSourceComponent = {
    bindings:{
        returnData: '&'
    },
	template,
	controller
};

