
let ListorEmptyControllerInjectables = ['ListorDataFactory', 'ListorFactory', '$rootScope', 'uiGridConstants', '$timeout', '$state', 'store'];

export default class ListorEmptyController {
	constructor(ListorDataFactory, ListorFactory, $rootScope, uiGridConstants, $timeout, $state, store) {
		'ngInject';
		this.ListorDataFactory = ListorDataFactory;
		this.ListorFactory = ListorFactory;
		this.$rootScope = $rootScope;
		this.uiGridConstants = uiGridConstants;
		this.$timeout = $timeout;
		this.$state = $state;
		this.store = store;

		this.dataSelected = false;
		this.showInstructions = false;
		this.usingChrome = false;
		this.entryStatusArray = [];

	}

	$onInit() {
		this.getChromeExtension();
	}

	uploadPosting(){
		this.dismiss();
	};

	getChromeExtension() {
		if(/Chrome/.test(navigator.userAgent)){
			this.usingChrome = true;
		}
	};
}

ListorEmptyController.$inject = ListorEmptyControllerInjectables;