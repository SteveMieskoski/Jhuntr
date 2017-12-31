let AccountDataFactoryInjectables = ['store', '$http', 'host', '$location', 'endPoints', 'UtilFactory'];


export class AccountDataFactory {
    constructor(store, $http, host, $location, endPoints, UtilFactory){
        'ngInject';
        this.store = store;
        this.$http = $http;
        this.host = host.host;
        this.$location = $location;
        this.routes = endPoints;
        this.UtilFactory = UtilFactory;
    }


    associateCloudAccount(user_id, userId, token){
        console.log('Associate User Accounts');

        let userData = {user_id: user_id, userId: userId, token: token};
        return this.$http.post(this.host() + this.routes.user.associate, userData)
            .then((results) => {
                console.log('User Accounts Associated: ', results);
                return results.data.data.userId;
            })
    }

    updateUser(data) {
        let userDataId = this.store.get('userID');
        return this.$http.put(this.host() + this.routes.user.update + userDataId, data);
    }

    getUser() {
        let profile = this.store.get('profile');
        if (profile) {
            profile = JSON.parse(profile);
            let id = profile.user_id;
            return this.$http.get(this.host() + this.routes.user.user + id)
                .then((results) => {
                    if (results.status === 401) {
						this.$location.path('/login');
                    }
                    if (results.data[0] === undefined) {
                        let newUser = {user_id: id, user_name: profile.email};
                    } else {
						this.store.set('userID', results.data[0]._id);
                        return results.data[0];
                    }
                })
                .catch((err)=>{this.UtilFactory.httpError(err)});
        }
    }

    updateUserSkills(data) {
        let skillsToAdd = {skills: data};
        let userDataId = this.store.get('userID');
        return this.$http.put(this.host() + this.routes.user.updateSkills + userDataId, skillsToAdd);
    }

    removeUserSkill(data) {
        let skillsToAdd = {skills: data};
        let userDataId = this.store.get('userID');
        return this.$http.put(this.host() + this.routes.user.removeSkill + userDataId, skillsToAdd);
    }

    getResList() {
        let userId = this.store.get('userID');
        return this.$http.get(this.host() + this.routes.creator.list + userId)
            .then((response) => {
                return response.data.data;
            })
            .catch((err)=>{this.UtilFactory.httpError(err)});
    }


}

AccountDataFactory.$inject = AccountDataFactoryInjectables;