let OtherSourceControllerInjectables = [];

export default class OtherSourceController{
	constructor(){

	}

	$onInit(){
	    this.placeholderLabel = '';
    }

	cancelAssociation(){
        this.returnData({data: null, action: false});
    }

    saveAssociation(label, source){
        if(label !== ''){
            console.log('save placeholder:', this.placeholderLabel);
            this.returnData({data: {label: label, source: source} , action: true});
        }
    }

}

OtherSourceController.$inject = OtherSourceControllerInjectables;

