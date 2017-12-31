let PostCompleteControllerInjectables = ['$rootScope', 'PostCompleteService'];

export default class PostCompleteController {
    constructor($rootScope, PostCompleteService) {
        this._$rootScope = $rootScope;
        this.postService = PostCompleteService;
    }

    $onInit() {
        this.allDetails = this.allData.data.data;
        window.angular.element(this.loadComplete());
        this.parseComponents(this.allDetails);

    }

    loadComplete() {
        this._$rootScope.$emit('navigationPageLoaded', 'tasksCompleteController');
    }

    parseComponents(data) {
        if (data.resume_ref) {
            this.postService.parseResume(data.resume_ref)
                .then((response) => {
                        console.log(response);
                        if(/[drive]/.test(response.result.kind)){
                            this.populateGoogleItems(response)
                        }
                    },
                    (error) => {
                        if (error.state) {

                            if (error.cloud === 'google') {
                                this.accessGrantedGoogle = false;
                            }
                            console.log('please re-authorize google access to view related files')
                        } else {

                        }
                    })
                .catch((error) => {
                    if (error.state) {
                        if (error.cloud === 'google') {
                            this.accessGrantedGoogle = false;

                        }
                        console.log('please re-authorize google access to view related files')
                    } else {

                    }
                })

        }
    }

    populateGoogleItems(data) {
        this.accessGrantedGoogle = true;
        this.thumbnail = data.result.thumbnailLink;
        this.link = data.result.webViewLink;
    }


    googleAuth() {
        this.postService.googleLogin()
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

PostCompleteController.$inject = PostCompleteControllerInjectables;

