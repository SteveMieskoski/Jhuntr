let UtilFactoryInjectables = ['UtilErrorFactory', 'GeneralFactory'];

export class UtilFactory {
	constructor(UtilErrorFactory, GeneralFactory) {
        'ngInject';
		this.ErrorFactory = UtilErrorFactory;
		this.GeneralFactory = GeneralFactory;
	}

    /**
     *
     * @param {string} event
     * @param {*} payload
     */
	emitPayload(event, payload) {
		this.GeneralFactory.emitPayload(event, payload);
	}


    /**
     *
     * @param {object} error
     * @param {object} options
     * @returns {*}
     */
	httpError(error, options) {
		return (error, options) => {this.ErrorFactory.httpError(error, options)};
	}

    /**
     *
     * @param {object} error
     * @param {object} options
     * @returns {*}
     */
	jsError(error, options) {
		this.ErrorFactory.jsError(error, options);
	}


}

UtilFactory.$inject = UtilFactoryInjectables;