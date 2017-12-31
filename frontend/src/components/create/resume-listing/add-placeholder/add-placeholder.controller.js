let AddPlaceholderControllerInjectables = [];

export default class AddPlaceholderController{
	constructor(){

	}

	$onInit(){
	    this.placeholderLabel = '';
    }

	cancelEntry(){
        this.returnData({data: null, action: false});
    }

    savePlaceholder(label){
	    if(label !== ''){
            console.log('save placeholder:', this.placeholderLabel);
            this.returnData({data: label , action: true});
        }
    }

}

AddPlaceholderController.$inject = AddPlaceholderControllerInjectables;

