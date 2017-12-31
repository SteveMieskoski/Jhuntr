let PostCompleteControllerInjectables = ['$rootScope', '$location', 'PostCompleteService'];

export default class PostCompleteController {
    constructor($rootScope, $location, PostCompleteService) {
        this._$rootScope = $rootScope;
        this.postService = PostCompleteService;
        this.$location = $location;
        this.editing = false;
        this.isCollapsedHorizontal = true;
        this.sliderWidth = {width: 0};
    }

    $onInit() {
        this.setup(this.allData.data.data);
        this.postService.getData()
            .then((response) => {
                console.log(response);
                this.allPosts = response;
            });
        window.angular.element(this.loadComplete());
    }

    setup(data){
        this.allDetails = data;
        this.mapType = this.hasLogo(this.allDetails);
        this.parseComponents(this.allDetails);
    }

    loadComplete() {
        this._$rootScope.$emit('navigationPageLoaded', 'tasksCompleteController');
    }

    toggleSlider(){
       // this.isCollapsedHorizontal = !this.isCollapsedHorizontal;
        if(this.sliderWidth.width === '250px'){
            this.sliderWidth = {width: 0};
        } else {
            this.sliderWidth = {width: '250px'};
        }
    }

    changePost(data){
        //this.$location.path('/target').search({status: data.status, entry: data._id, });
        this.setup(data);
        this.toggleSlider();
    }

    companySearchResult(company) {
        console.log(company);
        this.postService.getCompanyDetails(company.domain)
            .then((response) => {
                console.log('company result lookup response', response);
            })
            .catch((error) => {
                console.log('company result lookup error', error)
            })

    }

    openPostEdit(){
        this.postService.postUpdateModal(this.allDetails)
            .result
            .then((response) => {
                console.log('data edited', response);
                this.allDetails = response;
            })

    }

    saveEdit(newValue){
        console.log('saveEdit', newValue);
    }

    showEdit(){
        this.editing = true;
        this.detailsCopy = window.angular.copy(this.allDetails);
    }

    cancelEdit(){
        this.editing = false;
    }

    hasLogo(allDetails) {
            if(allDetails.logo !== ''){
                return 'singleCompany-logo';
            } else {
                return 'singleCompany';
            }
    }

    parseComponents(data) {
        if (data.company) {
            this.mapName = data.company;
        }
        if(data.logo){
            this.mapLogo = data.logo;
        }

        if (data.address) {
            this.mapAddress = data.address;
        } else if (data.company_address) {
            this.mapAddress = data.company_address;
        } else if (data.location) {
            this.mapAddress = data.location;
        } else if (data.city) {
            this.mapAddress = data.city;
        } else if (data.state) {
            this.mapAddress = data.state;
        }
        if (data.resume_ref) {
            this.postService.parseResume(data.resume_ref)
                .then((response) => {
                        console.log(response);
                        this.resDetails = response;
                    },
                    (error) => {
                        if (error.state) {

                            console.log('please re-authorize google access to view related files')
                        } else {

                        }
                    })
                .catch((error) => {
                    if (error.state) {

                        console.log('please re-authorize google access to view related files')
                    } else {

                    }
                })

        }
    }

}

PostCompleteController.$inject = PostCompleteControllerInjectables;

