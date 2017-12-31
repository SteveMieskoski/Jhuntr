import skillsJS from "./programming/javascript-skills.constants.js";


export const selectOptions = angular
    .module('selectOptions', [])
    .constant('skillsJS', skillsJS)
    .name;




