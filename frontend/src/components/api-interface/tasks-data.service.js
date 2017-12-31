let TasksDataFactoryInjectables = ['$http', 'endPoints', '$q', '$location', 'store', 'UtilFactory', 'ApiUtilities'];

export class TasksDataFactory {
    constructor($http, endPoints, $q, $location, store, UtilFactory, ApiUtilities) {
        'ngInject';
        this.$http = $http;
        this.routes = endPoints;
        this.$q = $q;
        this.$location = $location;
        this.store = store;
        this.UtilFactory = UtilFactory;
        this._ApiUtil = ApiUtilities;
    }

    /**
     *
     * @param {object} data
     */
    addTask(data) {
        let id;
        let profile = this.store.get('profile');
        if (profile) {
            profile = JSON.parse(profile);
            id = profile.user_id;
            return this.$http.post(this._ApiUtil.host() + this.routes.user.addTask + id, data)
                .then((response) => {
                    return response.data.data;
                })
                .catch((err) => {
                    this.UtilFactory.httpError(err)
                });
        }
    }

    /**
     *
     * @param {string} taskId
     * @param {object} data
     */
    updateTask(taskId, data) {
        return this.$http.put(this._ApiUtil.host() + this.routes.user.updateTask + taskId, data)
            .then((response) => {
                return response.data.data;
            })
            .catch((err) => {
                this.UtilFactory.httpError(err)
            });
    }

    /**
     *
     * @param {string} taskId
     */
    deleteTask(taskId) {
        return this.$http.delete(this._ApiUtil.host() + this.routes.user.deleteTask + taskId)
            .then((response) => {
                return response.data.data;
            })
            .catch((err) => {
                this.UtilFactory.httpError(err)
            });
    }

    /**
     *
     * @param {string} id
     */
    listTasks(id) {
        return this.$q((resolve, reject) => {
            let profile = this.store.get('profile');
            if (profile) {
                profile = JSON.parse(profile);
                id = profile.user_id ? profile.user_id : id;
                this.$http.get(this._ApiUtil.host() + this.routes.listor.list + id + '?tasks=1')
                    .then((response) => {
                        if (response.status === 401) {
                            this.$location.path('/login');
                        }
                        console.log(response);
                        if(response.data){
                            resolve(response.data.tasks);
                        } else {
                            resolve([]);
                        }

                    })
                    .catch((err) => {
                        reject(err); //this.UtilFactory.httpError(err)
                    });
            }
        })

    }

}


TasksDataFactory.$inject = TasksDataFactoryInjectables;