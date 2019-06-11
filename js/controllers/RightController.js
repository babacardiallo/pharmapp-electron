ng.controller('RightController', function($scope, DisplayService) {
    $scope.search = function() {
        if ($scope.inputSearch == undefined) {
            DisplayService.alertBox('La recherche', 'Champ non valide')
        } else {
            DisplayService.alertBox('La recherche', $scope.inputSearch)
        }
    };
});