ng.filter('fixedTo', function() {
	return function(number, round) {
		return parseFloat(number).fixedTo(round);
	};
});