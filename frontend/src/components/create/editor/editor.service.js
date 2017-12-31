let EditorFactoryInjectables = ['$rootScope', '$timeout', '$uibModal', '$q', 'EditorDataFactory'];


export class EditorFactory {
	constructor($rootScope, $timeout, $uibModal, $q, EditorDataFactory) {
        'ngInject';
		this.$rootScope = $rootScope;
		this.$timeout = $timeout;
		this.$uibModal = $uibModal;
		this.$q = $q;
		this.EditorDataFactory = EditorDataFactory;
		this.updatedImage = '';
	}


    /**
     *
     * @param {binaryArray} newValue
     */
	imageValue(newValue) {
		this.updatedImage = newValue;
	}

    /**
     *
     * @param {object} existingData
     */
	viewStyleOptions(existingData) {
		let modalInstance = this.$uibModal.open({
			animation: true,
			size: 'lg',
			component: 'styleModal',
			resolve: {
				existingData: this.$q.when(existingData)
			}
		});

		modalInstance.result.then((selectedData) => {
		}, () => {
			console.info('modal-component dismissed at: ' + new Date());
		});
	}

    /**
     *
     * @param {object} existingData
     */
	selectFromCore(existingData) {
		let modalInstance = this.$uibModal.open({
			animation: true,
			size: 'lg',
			component: 'importCore',
			resolve: {
				coreData: ['EditorDataFactory', (EditorDataFactory) => {
					return EditorDataFactory.retreiveMasterRes();
				}],
				existingData: this.$q.when(existingData)
			}
		});

		modalInstance.result.then((selectedData) => {
		}, () => {
			console.info('modal-component dismissed at: ' + new Date());
		});
	}

    /**
     *
     * @param {object} existingData
     * @param {string} section
     */
	viewAllSectionItems(existingData, section) {
		return this.$uibModal.open({
			animation: true,
			size: 'lg',
			component: 'allItemsModal',
			resolve: {
				existingData: this.$q.when(existingData),
				section: this.$q.when(section)
			}
		});
	}

}


EditorFactory.$inject = EditorFactoryInjectables;