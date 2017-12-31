class EditInPlaceController {
    constructor($timeout) {
        this.$timeout = $timeout;
        this.editing = false;
        this.editIcon = false;
    }


    doEditing(){
        this.editing = true;
        this.editValue = window.angular.copy(this.value);
    }

    editOption(){
        this.editIcon = true;
       /* this.showIcon = this.$timeout(()=>{
            this.editIcon = true;
        }, 500)*/
    }
    noEditOption(){
        if(!this.editIcon){
           this.$timeout.cancel(this.showIcon);
        } else {
            this.$timeout(()=>{
                this.editIcon = false;
            }, 750)
        }

    }

    save(){
        this.result({editedValue: this.editValue});
        this.editing = false;
    }

    cancel(){
        this.editing = false;
        this.editValue = '';
    }

}



EditInPlaceController.$inject = ['$timeout'];

export const EditInPlaceComponent = {
    bindings: {
        value: '<',
        result: '&',
        label: '<'
    },
    transclude: true,
    template: `
    <p ng-if="!$ctrl.editing" ng-focus="$ctrl.editOption()" ng-mouseleave="$ctrl.noEditOption()"><span ng-transclude></span></p>
    <button ng-if="$ctrl.editIcon" ng-click="$ctrl.doEditing()">Edit</button>
    <p ng-if="$ctrl.editing"><span class="detail-topic">{{$ctrl.label}}</span><input ng-model="$ctrl.editValue">
    <button ng-click="$ctrl.save()">save</button>
    <button ng-click="$ctrl.cancel()">cancel</button>
    </p>
    `,
    controller: EditInPlaceController
};

