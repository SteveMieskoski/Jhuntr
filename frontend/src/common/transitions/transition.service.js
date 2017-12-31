let TransFactoryInjectables = [ '$rootScope', '$timeout'];

export class TransFactory {
	constructor( $rootScope, $timeout) {
        'ngInject';
		this.$rootScope = $rootScope;
		this.$timeout = $timeout;
	}

	

	launchTransition() {
		// angular.element(document).find('body').hasClass('pg-loaded')
		if (document.querySelector('body.pg-loaded')) {
			this.$rootScope.uiViewStart = true;
			this.$rootScope.transitionInnerContent = true;

			this.$rootScope.jhloaded = false;
			this.$rootScope.jhloading = true;

			this.$rootScope.jhloadedInner = false;
			this.$rootScope.jhloadingInner = true;
			this.beginTransExit();
		}
	}


	

	beginTransExit() {
		this.$timeout( () => {
			this.$rootScope.uiViewStart = false;
			this.$rootScope.jhloaded = true;
			this.$rootScope.jhloadedInner = true;
			this.$timeout( () => {
				this.$rootScope.transitionInnerContent = false;
				this.$rootScope.jhloading = false;
				this.$rootScope.jhloadingInner = false;
			}, 500)
		}, 1000);

	}

}

TransFactory.$inject = TransFactoryInjectables;