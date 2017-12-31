let TasksDataFactoryInjectables = ['host', '$http', 'compRoutes', '$q', '$location', 'store', 'UtilFactory'];

export class TasksDataFactory {
    constructor(host, $http, compRoutes, $q, $location, store, UtilFactory) {
        'ngInject';
        this.host = host;
        this.$http = $http;
        this.routes = compRoutes;
        this.$q = $q;
        this.$location = $location;
        this.store = store;
        this.UtilFactory = UtilFactory;
    }


    addTask(data) {
        let id;
        let profile = this.store.get('profile');
        if (profile) {
            profile = JSON.parse(profile);
            id = profile.user_id;
            return this.$http.post(this.host() + this.routes.user.addTask + id, data)
                .then((response) => {
                    return response.data.data;
                })
                .catch(this.UtilFactory.httpError);
        }
    }

    updateTask(taskId, data) {
        return this.$http.put(this.host() + this.routes.user.updateTask + taskId, data)
            .then((response) => {
                return response.data.data;
            })
            .catch(this.UtilFactory.httpError);
    }

    deleteTask(taskId) {
        return this.$http.delete(this.host() + this.routes.user.deleteTask + taskId)
            .then((response) => {
                return response.data.data;
            })
            .catch(this.UtilFactory.httpError);
    }

    listTasks(id) {
        let profile = this.store.get('profile');
        if (profile) {
            profile = JSON.parse(profile);
            id = profile.user_id ? profile.user_id : id;
            return this.$http.get(this.host() + this.routes.listor.list + id + '?field=tasks')
                .then((response) => {
                    if (response.status === 401) {
                        this.$location.path('/login');
                    }
                    return response.data.data.tasks;
                })
                .catch(this.UtilFactory.httpError);
        }
    }

}


TasksDataFactory.$inject = TasksDataFactoryInjectables;