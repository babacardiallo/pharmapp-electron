ng.controller('DoctorController', function($scope, $mdDialog, DatabaseService, StringService, DisplayService) {

    var displayDoctors = function() {
        var allDoctors = [];
        DatabaseService.getDoctors().then(function(data) {
            allDoctors = data;
            $scope.doctors = [].concat(data);
        });
        $scope.doctors = allDoctors;
    };
    displayDoctors();

    $scope.addMD = function() {
        var newMD = {
            cabinet: $scope.cabinet,
            prenom: StringService.capitalize($scope.firstname),
            nom: StringService.upper($scope.lastname),
            adresse: $scope.address,
            telephone: $scope.telephone,
            fax: $scope.fax,
            codepostal: $scope.postal,
            ville: StringService.capitalize($scope.city)
        };
        DatabaseService.addDoctor(newMD).then(function() {
            DisplayService.alertBox('Enregistrement réussi', "Un nouveau médecin a été enregistré sur l'application");
        }, error => {
            DisplayService.alertBox('Erreur', "Une erreur est survenue lors de l'enregistrement");
        });
    };

    var getId = null;
    $scope.selectMD = function(id) {
        DatabaseService.getDoctor(id).then(function(data) {
            getId = data[0].id;
            $scope.cabinet = data[0].cabinet;
            $scope.firstname = data[0].prenom;
            $scope.lastname = data[0].nom;
            $scope.address = data[0].adresse;
            $scope.telephone = data[0].telephone;
            $scope.fax = data[0].fax;
            $scope.postal = data[0].codepostal;
            $scope.city = data[0].ville;
        });
    };

    $scope.updateMD = function() {
        var uptMD = {
            cabinet: $scope.cabinet,
            prenom: StringService.capitalize($scope.firstname),
            nom: StringService.upper($scope.lastname),
            adresse: $scope.address,
            telephone: $scope.telephone,
            fax: $scope.fax,
            codepostal: $scope.postal,
            ville: StringService.capitalize($scope.city)
        };
        DatabaseService.updateDoctor(uptMD, getId).then(function() {
            DisplayService.alertBox('Mise à jour réussie', "Un médecin a été mis à jour sur l'application");
        }, error => {
            DisplayService.alertBox('Erreur', "Une erreur est survenue lors de la mise à jour");
        });
    };

    $scope.deleteMD = function() {
        var confirm = DisplayService.confirmBox('Suppression', "Voulez-vous supprimer ce médecin?");
        $mdDialog.show(confirm).then(function() {
            var idMD = parseInt($scope._doctors);
            DatabaseService.deleteDoctor(idMD).then(function() {
                DisplayService.alertBox('Suppression réussie', "Le médecin a été supprimé de l'application");
            }, error => {
                DisplayService.alertBox('Erreur', "Une erreur est survenue lors de la suppression");
            });
        });
    };
});