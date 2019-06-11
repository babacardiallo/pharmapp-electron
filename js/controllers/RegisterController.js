ng.controller('RegisterController', function($scope, $http, $mdDialog, DisplayService, DatabaseService, StringService) {
    $scope.cancel = function() {
        var confirm = DisplayService.confirmBox('Annulation', "Voulez-vous annuler l'inscription?");
        $mdDialog.show(confirm).then(function() {
            ipcRenderer.send('annuler');
        }, function() {});
    };

    $scope.registration = function() {
        var newEmployee = {
            prenom: StringService.capitalize($scope.firstname),
            nom: StringService.upper($scope.lastname),
            datenaissance: $scope.birthday,
            telephone: $scope.telephone,
            portable: $scope.portable,
            adresse: $scope.address,
            ville: StringService.capitalize($scope.city),
            codepostal: $scope.postal,
            login: $scope.login,
            password: $scope.password
        };
        DatabaseService.addEmployee(newEmployee).then(function() {
            ipcRenderer.send('inscrire_fin');
            DisplayService.alertBox('Enregistrement réussi', "Vous êtes désormais enregistré sur l'application");
        }, error => {
            DisplayService.alertBox(error);
        });
    }
});