import controller from './transition.controller.js';

export const transitionComponent = {
	template: '<div class="jh-loading-inner">' +
	'<div class="jh-loading-center-outer">' +
	'<div class="jh-loading-center-middle">' +
	'<h1 class="jh-loading-logo-header">' +
	'<img class="jh-loading-logo" src="/drawing-medium.png">' +
	'</h1>' +
	'<div ng-class="[\'jh-loading-html\']">' +
	//         '{{$ctrl.loadingMessage}}' +
	'<div class="sk-wave">' +
	'<div class="sk-rect sk-rect1"></div>' +
	'<div class="sk-rect sk-rect2"></div>' +
	'<div class="sk-rect sk-rect3"></div>' +
	'<div class="sk-rect sk-rect4"></div>' +
	'<div class="sk-rect sk-rect5"></div>' +
	'</div>' +
	'</div>' +
	'</div>' +
	'</div>' +
	'</div>',

	controller
};


/*

 vm.$postLink = function(){
 //var elem = document.getElementById('transitionComponent');
 //document.addEventListener('transitionend', loadState )
 };



 //var animate = $animateCss()


 $scope.$onRootScope('loadStart', function(event, data){

 });

 //   $rootScope.$on('loadProgress', function (event, data) {
 function loadState(){
 console.log('loadState');
 if(angular.element(document).find('transition').hasClass('jh-load')) {
 addClass('jh-loading');
 removeClass('jh-load');
 addClass('jh-view-height');
 removeClass('jh-trans-hidden');
 button.addEventListener(transitionEvent, customFunction);

 }  else if(angular.element(document).find('transition').hasClass('jh-loading')){
 removeClass('jh-loading');
 button.addEventListener(transitionEvent, customFunction);
 } else {
 addClass('jh-trans-hidden');
 removeClass('jh-view-height');
 }

 }

 }
 */


















/*

 function loadState(){

 if(angular.element(document).find('transition').hasClass('jh-load')) {
 addClass('jh-loading');
 removeClass('jh-load');

 }  else if(angular.element(document).find('transition').hasClass('jh-loading') && angular.element(document).find('transition').hasClass('jh-loaded')){
 removeClass('jh-loading');

 }  else if(angular.element(document).find('transition').hasClass('jh-loading') && !angular.element(document).find('transition').hasClass('jh-loaded')){
 addClass('jh-loaded');

 } else if(angular.element(document).find('transition').hasClass('jh-loaded') && !angular.element(document).find('transition').hasClass('jh-loading')){
 addClass('jh-load');
 removeClass('jh-loaded');
 }

 }
 */

/*
 $scope.$onRootScope('loadFinished', function(event, data){

 addClass('jh-loaded');
 loadFinished();
 if(angular.element(document).find('transition').hasClass('jh-loaded')) {
 removeClass('jh-loading');

 } else if(angular.element(document).find('transition').hasClass('jh-loading')){

 }

 });
 */