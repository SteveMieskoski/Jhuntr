let postUpdateControllerInjectables = ['$scope', 'PostDisplayService', 'PostUpdateService', '$q', '$window', 'datePickerService', 'uibDateParser', '$state'];

export default class postUpdateController {
    constructor($scope, PostDisplayService, PostUpdateService, $q, $window, datePickerService, uibDateParser, $state) {
        this._PostDisplayService = PostDisplayService;
        this._PostUpdateService = PostUpdateService;
        this._datePickerService = datePickerService;
        this._uibDateParser = uibDateParser;
        this._$state = $state;
        this._$scope = $scope;
        this._$q = $q;
        this._$window = $window;
        this.newPostTask = {};
        this.additionalFieldOptions = {
            city: {show: false, model: 'city'},
            state: {show: false, model: 'state'},
            timePosted: {show: false, model: 'postingTime'},
            contact: {show: false, model: 'contactLabel'},
            address: {show: false, model: 'company_address'},
            source: {show: false, model: 'source'},
        };

    }

    $onInit() {
        this.postData = this.resolve.postData;
        this.originalData = window.angular.copy(this.resolve.postData);
        this.totalPosts = this.resolve.total;
        console.log('post update data recieved', this.postData);
        this.dt = new Date();
        console.log(this._$scope);

    }

    plainPostFileUpload(blah) {
        console.log('plainPostFileUpload');
        this._PostDisplayService.plainPostFileUploadModal(this.postData);
    }


    /**
     *
     * @param {string} message
     */
    confirm(message) {
        //  this.sweetAlert("Here's a message!");
        let defer = this._$q.defer();
        // The native confirm will return a boolean.
        if (this._$window.confirm(message)) {
            defer.resolve(true);
        } else {
            defer.reject(false);
        }
        return ( defer.promise );
    }

    submitPostUpdate(data) {
        console.log('submitPostUpdate', data);
        this._PostUpdateService.checkForAdditionalUpdates(data, this.originalData)
            .then((currentData) =>{
                this._PostUpdateService.updatePost(currentData._id, currentData)
                    .then((response) => {
                        console.log(response);
                        // TODO: If Location was updated then re-calculate the latitude and longitude ************************
                        // this.$rootScope.$emit('updateData');
                        this.close({$value: response})
                    })
            })
       /* */
    };

    locationChange(){
        console.log('location change');
    }


    deletePost(data) {
        if (this.totalPosts > 1) {
            this._PostDisplayService.deletePost(data)
                .then((response) => {
                    console.log('deletePost', response);
                    // this.$rootScope.$emit('updateData');
                    this.close({$value: response})
                })
        } else {
            this.confirm('Deleting the last post will remove this column.  Do you wish to Continue?').then(() => {
                this._PostDisplayService.deletePost(data)
                    .then((response) => {
                        console.log('deletePost', response);
                        // this.$rootScope.$emit('updateData');
                        this.close({$value: response})
                    })
            })
        }

    }

    addPostTask() {
        // this.newPostTask = {};
        if (Object.keys(this.newPostTask).length > 0) {
            this.postData.tasks.push(this.newPostTask);
            this.newPostTask = {};
        } else {
            console.log('NEW TASK');
        }
    }

    savePostTask() {
        if (Object.keys(this.newPostTask).length > 0) {
            this.postData.tasks.push(this.newPostTask);
            this.newPostTask = {};
        }
    }

    additionalFields(value) {
        if (this.additionalFieldOptions[value].show) {
            this.additionalFieldOptions[value].show = false;
            this.postData[this.additionalFieldOptions[value].model] = '';
        } else {
            this.additionalFieldOptions[value].show = true;
        }
    }

    expandedEdit(){
        this.dismiss();
        this._$state.go('postcomplete', {status: this.postData.status, entry: this.postData._id});
    }


    dateSelect() {
        this._datePickerService.datePickerModal()
            .result
            .then((response) => {
                    this.postData.dateApplied = response;
                    console.log(response);
                },
                (dismiss) => {
                    console.log(dismiss);
                })
    }


}


postUpdateController.$inject = postUpdateControllerInjectables;