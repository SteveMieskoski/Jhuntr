let RootHostServiceInjectables = ['$location'];

export class RootHostService{

    constructor($location){
        'ngInject';
        this.$location = $location;
    }

	host() {
		let protocol = this.$location.protocol();
		let host = this.$location.host();
		let port = this.$location.port();
		if (!port) {
			return protocol + '://' + host;
		} else {
			return protocol + '://' + host + ':' + port;
		}
	}

    hostUrl() {
        let protocol = this.$location.protocol();
        let host = this.$location.host();
        let port = this.$location.port();
        if (!port) {
            return protocol + '://' + host;
        } else {
            return protocol + '://' + host + ':' + port;
        }
    }
}


RootHostService.$inject = RootHostServiceInjectables;
