let IdentityServiceInjectables = ['host', '$timeout', '$http', '$log', '$q', 'store', '$rootScope', '$location', 'authConsts'];

export class IdentityService {
    constructor(host, $timeout, $http, $log, $q, store, $rootScope, $location, authConsts) {
        this.host = host.host;
        this.$timeout = $timeout;
        this.$http = $http;
        this.$log = $log;
        this.$q = $q;
        this.store = store;
        this.$rootScope = $rootScope;
        this.$location = $location;
        this.authConsts = authConsts;
    }

    externalUserAuthData() {
        if (this.authConsts.authProvider === 'auth0') {
            let profile = this.store.get('profile');
            if (profile) {
                profile = JSON.parse(profile);
                return profile;
            } else {
                return false;
            }

        }
    }


    userDataCheck(profile) {
        return this.$q((resolve, reject) => {
            if (profile.user_metadata) {
                console.log('profile.user_metadata', profile.user_metadata);
                this.store.set('userID', profile.user_metadata.userId);
                resolve();
            } else {
                console.log(profile.user_id);
                this.createNewUser(profile.user_id, profile.email)
                    .then((response) => {
                        this.store.set('userID', response);
                        resolve('userCreated');
                    })
                    .catch((err) => {
                        console.log(err);
                        reject();
                    })
            }
        })
    }


    createNewUser(ExtId, email) {
        console.log('create new user');
        let token = this.store.get('id_token');

        let newUser = {data: {user_id: ExtId, user_name: email}, token: token};
        return this.$http.post(this.host() + '/user/createUser', newUser)
            .then((results) => {
                console.log('Create User Result', results);
                return results.data.data.userId;
            })
    }

}


IdentityService.$inject = IdentityServiceInjectables;


/*
 //let IdentityServiceInjectables = ['auth0Interface', '$timeout', '$http', '$log', '$q', 'store', '$rootScope', '$location'];
 export class IdentityService{  //content to be transfered/replace that within auth.service
 constructor(auth0Interface, $timeout, $http, $log, $q, store, $rootScope, $location){
 this.auth0Interface = auth0Interface;
 this.$timeout = $timeout;
 this.$http = $http;
 this.$log = $log;
 this.$q = $q;
 this.store = store;
 this.$rootScope = $rootScope;
 this.$location = $location;

 }

 isAuthenticated() {
 return this.auth0Interface.isAuthenticated();

 }



 isLoggedIn() {
 return this.auth0Interface.isLoggedIn();

 }

 login(user, pass) {
 return this.$q((resolve, reject) => {
 this.auth0Interface.login(user, pass,  (err) => {
 if (err) {
 this.$log.info('login Error', err);
 reject(err);
 }
 resolve(true);
 });
 });

 };

 logout(){
 this.auth0Interface.logout();
 this.store.remove('userID');
 this.store.remove('newUser');
 this.store.remove('lastEdited');
 this.$rootScope.isAuthenticated = false;
 this.$location.path('/');
 }

 showSignupForm() {
 this.loginForm = !this.loginForm;
 }

 signup(userSignup, userPass) {
 return this.$q((resolve, reject) => {
 console.log('signup details', userSignup, userPass);
 this.auth0Interface.signup(userSignup, userPass,  (err) => {
 if (err) {
 this.$log.info('signup Error', err);
 reject(err);
 }
 resolve(true);
 });
 })

 };

 googleLogin() {
 return this.$q((resolve, reject) => {
 this.auth0Interface.googleLogin( (err) => {
 if (err) {
 this.$log.info('googleLogin Error', err);
 reject(err);
 }
 resolve(true);
 });
 });

 };

 githubLogin() {
 return this.$q((resolve, reject) => {
 this.auth0Interface.githubLogin( (err) => {
 if (err) {
 this.$log.info('githubLogin Error', err);
 reject(err);
 }
 resolve(true);
 });
 });

 };

 facebookLogin() {
 return this.$q((resolve, reject) => {
 this.auth0Interface.facebookLogin( (err) => {
 if (err) {
 this.$log.info('facebookLogin Error', err);
 reject(err);
 }
 resolve(true);
 });
 });

 };
 }

 //IdentityService.$inject = IdentityServiceInjectables;
 */
