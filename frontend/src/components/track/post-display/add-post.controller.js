let addPlainPostControllerInjectables = ['PostDisplayService', 'companyLookupService', 'LocationParserService', '$q'];


export default class addPlainPostController {
    constructor(PostDisplayService, companyLookupService, LocationParserService, $q) {
        'ngInject';
        this.PostDisplayService = PostDisplayService;
        this.companyLookupService = companyLookupService;
        this.LocationParserService = LocationParserService;
        this.$q = $q;
        this.newTaskForm = false;
        this.runAddressParser = true;
        this.postData = {};
        this.postTasks = [];
        this.newPostTask = {};
        this.additionalFieldOptions = {
            location: {show: true, model: 'location'},
            city: {show: false, model: 'city'},
            state: {show: false, model: 'state'},
            timePosted: {show: false, model: 'postingTime'},
            contact: {show: false, model: 'contactLabel'},
            address: {show: false, model: 'company_address'},
            source: {show: false, model: 'source'},
        };
    }

    $onInit() {
        this.plain = this.resolve.plain;
        if (this.plain) {
            this.status = this.resolve.statusList;
        } else {
            this.statusList = this.resolve.statusList;
        }

    }

    // subdiv_code


    submitNewPlainPost(postData) {

        if (this.plain) {
            this.PostDisplayService.addPlainPost(this.status, postData)
                .then((response) => {
                    console.log(response);
                    // this.$rootScope.$emit('updateData');
                    this.close({$value: response})
                })
        } else {
            this.PostDisplayService.addPlainPost(postData.status, postData)
                .then((response) => {
                    console.log(response);
                    // this.$rootScope.$emit('updateData');
                    this.close({$value: response})
                })
        }


    };

    submitPost(postData){
        postData.tasks = this.postTasks;
        if (this.postData.location && this.runAddressParser) {
            this.parseAddress(postData.location)
                .then((response) => {
                    if(response.merge){
                        let mergedPost = Object.assign({}, postData, response.value);
                        console.log('merged post data', mergedPost);
                        this.submitNewPlainPost(mergedPost);
                    } else {
                        this.submitNewPlainPost(postData);
                    }

                })
        } else {
            this.submitNewPlainPost(postData);
        }
    }


    parseAddress(location) {
        return new Promise((resolve, reject) => {
                this.LocationParserService.getCoordinates(location)
                    .then((locationDetails) => {
                        resolve({merge: true, value: locationDetails})
                    })
                    .catch((error) => {
                        resolve({merge: false})
                    })

        })

    }


    additionalFields(value) {
        if (this.additionalFieldOptions[value].show) {
            this.additionalFieldOptions[value].show = false;
            this.postData[this.additionalFieldOptions[value].model] = '';
        } else {
            this.additionalFieldOptions[value].show = true;
        }
    }

    addPostTask() {
        if (Object.keys(this.newPostTask).length > 0) {
            this.postTasks.push(this.newPostTask);
            this.newPostTask = {};
        }
        // this.postData.tasks.push({});
    }

    companySearchModal() {
        this.companyLookupService.companyLookupModal()
            .result
            .then((response) => {
                this.runAddressParser = false;
                this.postData.location = response.detailedLocation.address;
                this.postData.state = response.detailedLocation.state;

                this.postData.city = response.detailedLocation.city;
                this.postData.region = response.detailedLocation.region;
                this.postData.zip = response.detailedLocation.zip;
                this.postData.street = response.detailedLocation.street;
                this.postData.number = response.detailedLocation.number;
                this.postData.lat = response.detailedLocation.lat;
                this.postData.long = response.detailedLocation.long;

                this.postData.company = response.company;
                if (response.hasOwnProperty('url')) {
                    this.postData.company_url = response.url;
                }
                if (response.hasOwnProperty('logo')) {
                    this.postData.logo = response.logo;
                }

                //  this.postData.companyAltName = response.altName;

                /*    this.postData.location = response.location;
                 this.postData.company = response.name;
                 this.postData.company_url = response.domain;
                 this.postData.logo = response.logo;*/

                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

addPlainPostController.$inject = addPlainPostControllerInjectables;