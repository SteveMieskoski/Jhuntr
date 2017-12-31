let PostCompleteServiceInjectables = ['$rootScope', 'CreatorDataFactory', 'CloudDataService', '$q', 'PostUpdateService', 'ListorDataFactory'];

export class PostCompleteService {
    constructor($rootScope, CreatorDataFactory, CloudDataService, $q, PostUpdateService, ListorDataFactory) {
        this.$rootScope = $rootScope;
        this.CreatorDataService = CreatorDataFactory;
        this.CloudDataService = CloudDataService;
        this.PostUpdateService = PostUpdateService;
        this.ListorDataFactory = ListorDataFactory;
        this.$q = $q;
        this.currentExternalId = '';
    }

    parseResume(res) {
        return this.CreatorDataService.getData(res, false)
            .then((response) => {
                console.log(response);
                switch (response._kind) {
                    case 'DropBoxRefResume':
                        return this.parseDropBox(response);
                        break;
                    case 'DriveRefResume':
                        return this.parseGoogle(response);
                        break;
                    case 'CoreResume':
                        this.parseInternal(response);
                        break;
                    default:
                        console.log('default case', response);
                        break;
                }
            })


    }

    getData() {
        return this.ListorDataFactory.listPosts({
            created_at: 1,
            resume_label: 1,
            tasks: 1,
            company_address: 1,
            contactLabel: 1,
            contactDetail: 1,
            dateApplied: 1,
            source: 1,
            location: 1,
            city: 1,
            state: 1,
            logo: 1,
            lat: 1,
            long: 1
        })
    }

    postUpdateModal(data){
        return this.PostUpdateService.plainPostUpdateModal(data, 0)
    }

    parseDropBox(data) {
        return this.$q((resolve, reject) => {
            console.log('dropbox', data);
            resolve(data);
        })
    }

    parseGoogle(data) {
        return this.$q((resolve, reject) => {
            console.log('google', data);
            resolve(data);
        })
    }


    parseInternal(data) {
        console.log('internal', data);
    }

    getCompanyDetails(domain){
       return this.CloudDataService.companyLookup(domain)
    }
}

PostCompleteService.$inject = PostCompleteServiceInjectables;

