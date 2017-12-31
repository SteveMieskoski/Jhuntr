let ErrorFactoryInjectables = ['utilConfig', '$state', 'LoDash', '$q'];

export class ErrorFactory {
	constructor(utilConfig, $state, LoDash, $q) {
        'ngInject';
		this.utilConfig = utilConfig;
		this.$state = $state;
		this._ = LoDash;
		this.$q = $q;
	}

	httpError(error, options) {
		//return this.$q((resolve, reject) => {
            console.log(error);
            //if (this.utilConfig.variableError) {
            switch (options) {
                case 'log':
                    this.handleSpecificHttpErrors(error);
                    console.log(error);
                    break;
                case 'alert':
                    this.handleSpecificHttpErrors(error);
                    alert(error);
                    break;
                default:
                    this.handleSpecificHttpErrors(error);
                    alert(error);
                    break;
            }
            console.log('HTTP ERROR', error);
        //    resolve(error);
		//})
	}

	handleSpecificHttpErrors(error) {
		switch (error.status) {
			case 401:
				if (error.data === 'revalidate') {

				}
				break;
			case 404:
				break;
			case 500:
				break;
		}

	}

	jsError(error, options) {
		if (this.utilConfig.variableError) {
			switch (options) {
				case 'log':
					console.log(error);
					break;
				case 'alert':
					alert(error);
					break;
				default:
					alert(error);
					break;
			}
		}
	}
}


ErrorFactory.$inject = ErrorFactoryInjectables;
