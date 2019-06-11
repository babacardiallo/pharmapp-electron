ng.controller('LoginController', function($scope, $mdDialog, DisplayService, DatabaseService) {
    $scope.connect = function() {
        var employees = DatabaseService.getEmployees().then(function(data) {
            var login = $scope.login;
            var password = $scope.password;
            if (login == undefined || password == undefined) {
                DisplayService.alertBox('Erreur', "Tous les champs n'ont pas été renseignés");
            } else {
                for (i = 0; i < data.length; i++) {
                    if (login == data[i].login && password == data[i].password) {
                        ipcRenderer.send('ouvrir');
                    } else {
                        DisplayService.alertBox('Erreur', 'Impossible de se connecter');
                    }
                }
            }
        }, error => {
            DisplayService.alertBox(error);
        });
    }

    $scope.register = function() {
        ipcRenderer.send('inscrire');
    }

    $scope.showConfirm = function() {
        var confirm = DisplayService.confirmBox('Fermeture', "Voulez-vous fermer l'application?");
        $mdDialog.show(confirm).then(function() {
            ipcRenderer.send('fermer');
        });
    };
});