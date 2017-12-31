"use strict";

import {loginSignup} from './login-signup/login-signup.module.js';

import {configAuth} from "./auth.config.js";


import {AuthService} from "./auth.service.js";
import {runAuth} from "./auth.run.js";
import{IdentityService} from './identity.service.js';
import {auth0Interface} from'./auth0-interface.service.js';
import {authConfigConstants} from './auth-config.constants.js';

export const authentication = angular
    .module('authentication', [
        'auth0.auth0',
        'angular-jwt',
        'ngCookies',
        'angular-storage',
        'ui.router',
        loginSignup
    ])
    .config(configAuth)
    .run(runAuth)
    .constant('authConsts', authConfigConstants)
    .service('AuthService', AuthService)
    .service('auth0Interface', auth0Interface)
    .service('IdentityService', IdentityService)
    .name;




