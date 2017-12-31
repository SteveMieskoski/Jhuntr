import template from "./list-resumes.component.html";

let ListResumesControllerInjectables = ['CreatorDataFactory'];

class  ListResumesController{
    constructor(CreatorDataFactory) {
        this.CreatorDataFactory = CreatorDataFactory;
        //CreatorDataFactory.getResList();
        this.resumeList = [];
        this.selectedResume = {};
    }

    $onInit(){
        this.listResumes();
    }

    listResumes(){
        this.CreatorDataFactory.getResList()
            .then((response) => {
                console.log(response);
                this.resumeList = response
            })
            .catch((error) => {
                console.log(error);
            })
    }

    updateSelected(){
        this.resumeLabel = this.selectedResume.ref_label;
        this.resumeRef =  this.selectedResume._id;
    }
}

ListResumesController.$inject = ListResumesControllerInjectables;

export const ListResumesComponent = {
    bindings:{
        resumeLabel: '=',
        resumeRef: '='
    },
    template,
    controller: ListResumesController
};