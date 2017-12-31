let ApiUtilitiesInjectables = ['$rootScope', '$http',  '$location', 'store', 'endPoints', 'UtilFactory', '$q'];

export class ApiUtilities{
	constructor($rootScope, $http, $location, store, endPoints, UtilFactory, $q) {
		'ngInject';
		this._$q = $q;
		this.$rootScope = $rootScope;
		this.$http = $http;
		this.$location = $location;
		this._store = store;
		this.routes = endPoints;
		this.UtilFactory = UtilFactory;
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

	/**
	 * Note: Need to find a cleaner or more integrated way to check and populate userID.  like: could use this instead of store.get in the items below
	 * @returns {*}
	 */
	getInternalUserId() {
		return this._$q((resolve, reject) => {
			let userId = this._store.get('userID');
			if (!userId) {
				let profile = this._store.get('profile');
				if (profile) {
					profile = JSON.parse(profile);
					let id = profile.user_metadata.userId;
					resolve(id)
				}
			} else {
				resolve(userId);
			}
		})
	}

    getNewInternalUserId() {  // is executing before the new user id is stored on user Sign up.  Need to create
        return this._$q((resolve, reject) => {
            let userId = this._store.get('userID');
            if (!userId) {
                let profile = this._store.get('profile');
                if (profile) {
                    profile = JSON.parse(profile);
                    let id = profile.user_metadata.userId;
					resolve(id);
                } else {
                	 reject('no user ID');
				}
            } else {
                resolve(userId);
            }
        })
    }

    /**
     * Note: Need to find a cleaner or more integrated way to check and populate userID.  like: could use this instead of store.get in the items below
     * @returns {*}
     */
    getExternalUserId() {
        return this._$q((resolve, reject) => {
                let profile = this._store.get('profile');
                if (profile) {
                    profile = JSON.parse(profile);
                    let id = profile.user_id;
                    if(id){
                    	resolve(id);
					} else {
                    	console.log('error getting external user id');
                        reject('ERROR')
					}
                }

        })
    }
	/*
    responseTransform(){
        $http.defaults.transformResponse.push(cleanResponse);
        function cleanResponse(data, headersGetter, status) {
            console.log(data);
            if(data.data){
                return data.data;
            }
	}*/


}


ApiUtilities.$inject = ApiUtilitiesInjectables;