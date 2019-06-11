ng.service('DisplayService', function($mdDialog) {
	return {
		alertBox: function(title, content) {
			$mdDialog.show($mdDialog.alert()
                     .parent(angular.element(document.body))
                     .title(title)
                     .content(content)
                     .ok('OK'));
		},
		confirmBox: function(title, content) {
			return $mdDialog.confirm()
							.title(title)
						  	.content(content)
						  	.ok('OK')
						  	.cancel('Annuler');
		}
	}
});