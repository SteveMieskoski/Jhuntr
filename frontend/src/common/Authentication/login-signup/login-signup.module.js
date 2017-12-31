import {authSignUpComponent} from "./sign-up.component.js";
import {authLoginComponent} from "./auth-login.component.js";
import {loginLiteComponent} from "./auth-login-lite.component.js";
import {authComponent} from "./auth.component.js";
import {loginSignupConfig} from './login-signup.config.js';

export const loginSignup = angular
    .module('login-signup', [])
    .config(loginSignupConfig)
    .component('authComp', authComponent)
    .component('authLogin', authLoginComponent)
    .component('loginLite', loginLiteComponent)
    .component('authsignup', authSignUpComponent)
    .name;