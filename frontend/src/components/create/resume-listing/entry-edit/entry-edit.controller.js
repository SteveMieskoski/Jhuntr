let EntryEditControllerInjectables = [];

export default class EntryEditController{
	constructor(){

	}

	$onInit(){
        this.editLabel = this.editData.ref_label;
        this.editRes = this.editData._id;
        this.editKind = this.editData._kind;
        console.log('this.editData', this.editData);
    }

	cancelEdit(){
        this.returnData({editRes: this.editRes, data: this.editLabel, action: 'cancel'});
    }

    saveEdit(resId, label, index){
        this.returnData({editRes: resId, data: {label: label, index: index} , action: 'update'});
    }

    deleteEntry(resId, kind){
        this.returnData({editRes: resId, data: kind, action: 'delete'});
    }
}

EntryEditController.$inject = EntryEditControllerInjectables;

