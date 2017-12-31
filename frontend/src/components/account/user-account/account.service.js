
export class UserFactory {
    constructor(store, $http, host){
        'ngInject';
        this.store = store;
        this.$http = $http;
        this.host = host;
    }

         updateUser(data) {
            let userDataId = this.store.get('userID');
            return this.$http.put(this.host() + '/user/update/' + userDataId, data);
        }

         getUser() {
            let profile = this.store.get('profile');
            if (profile) {
                profile = JSON.parse(profile);
                let id = profile["user_id"].match(/(?![auth0|]).*/);
                return this.$http.get(this.host() + '/user/' + id[0])
                            .then( (results) => {
                                if (results.data[0] === undefined) {
                                    let newUser = {user_id: id, user_name: profile.email};
                                    $http.post(this.host() + '/user/createUser', newUser)
                                         .then( (results) => {
											 this.store.set('userID', results.data.item._id);
                                             return results.data.item;
                                         })
                                } else {
									this.store.set('userID', results.data[0]._id);
                                    return results.data[0];
                                }
                            })
            }
        }

         updateUserSkills(data) {
                let skillsToAdd = {skills: data};
                let userDataId = this.store.get('userID');
                return this.$http.put(this.host() + '/user/updateSkills/' + userDataId, skillsToAdd);

        }

         removeUserSkill(data) {
                let skillsToAdd = {skills: data};
                let userDataId = this.store.get('userID');
                return this.$http.put(this.host() + '/user/removeSkill/' + userDataId, skillsToAdd);

        }
    }

