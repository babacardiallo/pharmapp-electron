/* MAIN */
/*ng.directive('ngSidenavSearch', function() {
	return {
		templateUrl: '../templates/main/_sidenav_search.html'
	}
});*/
ng.directive('ngContent', function() {
	return {
		restrict: 'E',
		templateUrl: '../templates/main/_content.html'
	}
});
ng.directive('ngSidenavMenu', function() {
	return {
		templateUrl: '../templates/main/_sidenav_menu.html'
	}
});
ng.directive('ngToolbar', function() {
	return {
		restrict: 'E',
		templateUrl: '../templates/main/_toolbar.html'
	}
});