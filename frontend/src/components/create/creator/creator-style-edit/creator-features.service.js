
export class CreatorFeaturesFactory {
	constructor($rootScope, featureConstants) {
        'ngInject';
		this.$rootScope = $rootScope;
		this.featureConstants = featureConstants;
	};
	
	dataUpdated() {
		this.$rootScope.$emit('creatorDataUpdated');
	}



	availableSections(existingData) {
		let i;
		let sectionMatches;
			// angular.copy(featureConstants.allSectionsDefault)
		sectionMatches = this.featureConstants.allSectionsDefault;
		if (existingData.design.inner_templates.left.length >= 1 || existingData.design.inner_templates.right.length > 1) {
			for (let prop in sectionMatches) {
				sectionMatches[prop] = true;
			}
			for (i = 0; i < existingData.design.inner_templates.left.length; i++) {
				sectionMatches[existingData.design.inner_templates.left[i].section] = false;
			}
			for (i = 0; i < existingData.design.inner_templates.right.length; i++) {
				sectionMatches[existingData.design.inner_templates.right[i].section] = false;
			}
			return sectionMatches;
		} else {
			return sectionMatches;
		}
	};


}

CreatorFeaturesFactory.$inject = ['$rootScope', 'featureConstants'];