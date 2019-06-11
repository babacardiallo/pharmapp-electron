var ng = angular.module('Software', ['ngMaterial', 'ngMessages', 'ngSanitize']);

ng.config(function($mdThemingProvider) {
	$mdThemingProvider.theme('default').primaryPalette('green');
});