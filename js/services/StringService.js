ng.service('StringService', function() {
	return {
		upper: function(string) {
			return string.toUpperCase();
		},
		capitalize: function(string) {
			return string.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
		}
	}
});