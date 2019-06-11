ng.controller('LabController', function($scope, $mdDialog, DatabaseService, DisplayService, StringService) {

    var displayLabs = function() {
        var allLaboratories = [];
        DatabaseService.getLaboratories().then(function(data) {
            allLaboratories = data;
            $scope.laboratories = [].concat(data);
        });
        $scope.laboratories = allLaboratories;
    };
    displayLabs();

    $scope.addLaboratory = function() {
        var newLab = {
            nom: StringService.capitalize($scope.name),
            adresse: $scope.address,
            telephone: $scope.telephone,
            fax: $scope.fax,
            email: $scope.email,
            codepostal: $scope.postal,
            ville: StringService.capitalize($scope.city)
        };
        DatabaseService.addLaboratory(newLab).then(function() {
            DisplayService.alertBox('Enregistrement réussi', "Un nouveau laboratoire a été enregistré sur l'application");
        }, error => {
            DisplayService.alertBox('Erreur', "Une erreur est survenue lors de l'enregistrement");
        });
    };

    var getId = null;
    $scope.selectLab = function(id) {
        DatabaseService.getLaboratory(id).then(function(data) {
            getId = data[0].id;
            $scope.name = data[0].nom;
            $scope.address = data[0].adresse;
            $scope.telephone = data[0].telephone;
            $scope.fax = data[0].fax;
            $scope.email = data[0].email;
            $scope.postal = data[0].codepostal;
            $scope.city = data[0].ville;
        });
    };

    $scope.updateLab = function() {
        var uptLab = {
            nom: StringService.capitalize($scope.name),
            adresse: $scope.address,
            telephone: $scope.telephone,
            fax: $scope.fax,
            email: $scope.email,
            codepostal: $scope.postal,
            ville: StringService.capitalize($scope.city)
        };
        DatabaseService.updateLaboratory(uptLab, getId).then(function() {
            DisplayService.alertBox('Mise à jour réussie', "Un laboratoire a été mis à jour sur l'application");
        }, error => {
            DisplayService.alertBox('Erreur', "Une erreur est survenue lors de la mise à jour");
        });
    };

    $scope.deleteLab = function() {
        var confirm = DisplayService.confirmBox('Suppression', "Voulez-vous supprimer ce laboratoire?");
        $mdDialog.show(confirm).then(function() {
            var idLab = parseInt($scope._laboratories);
            DatabaseService.deleteLaboratory(idLab).then(function() {
                DisplayService.alertBox('Suppression réussie', "Le laboratoire a été supprimé de l'application");
            }, error => {
                DisplayService.alertBox('Erreur', "Une erreur est survenue lors de la suppression");
            });
        });
    };
});