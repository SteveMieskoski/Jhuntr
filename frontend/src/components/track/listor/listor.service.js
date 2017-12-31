let ListorFactoryInjectables = ['$uibModal', '$rootScope', '$document', '$q', 'ListorDataFactory'];

export class ListorFactory {
    constructor($uibModal, $rootScope, $document, $q, ListorDataFactory) {
        'ngInject';
        this.$uibModal = $uibModal;
        this.ListorDataFactory = ListorDataFactory;
        this.$rootScope = $rootScope;
        this.$document = $document;
        this.$q = $q;
        this.posts = [];
    }


    compileTasks(postList) {
        return this.$q((resolve, reject) => {
            let tasks = [];
            for (let i = 0; i < postList.length; i++) {
                if (postList[i].remarks) {
                    for (let n = 0; n < postList[i].remarks.tasks.length; n++) {
                        tasks.push({postRemark: postList[i].remarks._id, task: postList[i].remarks.tasks[n]})
                    }
                }
            }
            resolve(tasks);
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

    columnSelect(current) {
        return this.$uibModal.open({
            animation: true,
            size: 'md',
            component: 'columnSelect',
            resolve: {
                current: () => {
                    return window.angular.copy(current);
                }
            }
        });
    }

    emptyList(selectedData) {
        if (arguments.length === 2) {
            selectedData.newEdit = true;
        }
        let modalInstance = this.$uibModal.open({
            animation: true,
            size: 'lg',
            component: 'listorEmpty',
            resolve: {
                item: () => {
                    return window.angular.copy(selectedData);
                }
            }
        });

        modalInstance.result.then(() => {
        }, () => {
            console.info('modal-component dismissed at: ' + new Date());
        });
    }

}


ListorFactory.$inject =  ListorFactoryInjectables;