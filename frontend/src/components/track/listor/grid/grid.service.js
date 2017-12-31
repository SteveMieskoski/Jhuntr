let GridServiceInjectables = ['$uibModal', '$rootScope', '$document', '$q', 'ListorDataFactory'];

export class GridService{
    constructor($uibModal, $rootScope, $document, $q, ListorDataFactory) {
        'ngInject';
        this.$uibModal = $uibModal;
        this.ListorDataFactory = ListorDataFactory;
        this.$rootScope = $rootScope;
        this.$document = $document;
        this.$q = $q;
        this.posts = [];
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

    updatePost(postId, data) {
        return this.ListorDataFactory.update(postId, data)
            .then((response) => {
                console.log('update post response', response);
                this.$rootScope.$emit('updateStatues');
                return response;
            })
            .catch((error) => {
                console.log('update post response ERROR', error);
            })
    }

    deletePost(data) {
        return this.ListorDataFactory.removePosting(data._id)
            .then((response) => {
                console.log('delete post response', response);
                this.$rootScope.$emit('updateStatues');
                return response;
            })
            .catch((error) => {
                console.log('delete post response ERROR', error);
            })
    }
}

GridService.$inject = GridServiceInjectables;