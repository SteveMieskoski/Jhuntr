"use strict";

let RemindersDataFactoryInjectables = ['host', '$http', 'compRoutes', '$q', '$location', 'store'];

export class RemindersDataFactory{
    constructor(host, $http, routes, $q, $location, store){
        'ngInject';
        this.host = host;
        this.$http = $http;
        this.routes = routes;
        this.$q = $q;
        this.$location = $location;
        this.store = store;
        this.listData = {};
    }

    addReminder(data) {
       let id;
       let profile = this.store.get('profile');
        if (profile) {
            profile = JSON.parse(profile);
            id = profile.user_id;
            return this.$http.post(this.host() + this.routes.user.addReminder + id, data)
                .then((response) => {
                    return response.data.data;
                })
        }
    }

    updateReminder(reminderId, data) {
        return this.$http.put(this.host() + this.routes.user.updateReminder + reminderId, data)
            .then((response) => {
                return response.data.data;
            })
    }

    deleteReminder(reminderId) {
        return this.$http.delete(this.host() + this.routes.user.deleteReminder + reminderId)
            .then((response) => {
                return response.data.data;
            })
    }

    listReminders(id) {
       let profile = this.store.get('profile');
        if (profile) {
            profile = JSON.parse(profile);
            id = profile.user_id;
            return this.$http.get(this.host() + this.routes.listor.list + id + '?reminders=1')
                .then((response) => {
                if (response.status === 401) {
                    this.$location.path('/login');
                }
                return response.data.data.reminders;

            })
        }
    }
}

RemindersDataFactory.$inject = RemindersDataFactoryInjectables;