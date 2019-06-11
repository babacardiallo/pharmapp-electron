ng.controller('AppController', function($scope, $mdSidenav, MenuService, $timeout, $mdUtil, $rootScope, DatabaseService, StringService, DisplayService) {

    var displayPharmacies = function() {
        var allPharmacies = [];
        DatabaseService.getPharmacies().then(data => {
            allPharmacies = data;
            $scope.pharmacies = [].concat(data);
        });
        $scope.pharmacies = allPharmacies;
    };
    displayPharmacies();

    $scope.thisPharmacy = null;
    $scope.selectedPharmacy = function(pharmacy) {
        if (pharmacy) {
            $scope.thisPharmacy = pharmacy;
            $rootScope.thisPharmacy = pharmacy;
            $rootScope.pharmaid = pharmacy.id;
        }
    };

    $scope.addPharmacy = function() {
        var newPharmacy = {
            nom: $scope.name,
            adresse: $scope.address,
            telephone: $scope.telephone,
            fax: $scope.fax,
            email: $scope.email,
            ville: StringService.capitalize($scope.city),
            codepostal: $scope.postal
        };
        DatabaseService.addPharmacy(newPharmacy).then(function() {
            if ($scope.pharmacies.length == 0)
                DisplayService.alertBox('Enregistrement réussi', "Bravo! Vous avez créer votre première pharmacie sur l'application");
            else
                DisplayService.alertBox('Enregistrement réussi', "Une nouveau pharmacie a été enregistré sur l'application.<br>Actualisez l'application pour voir la nouvelle pharmacie.");
        }, error => {
            DisplayService.alertBox('Erreur', "Une erreur est survenue lors de l'enregistrement");
        });
    };

    /***********************************************/

    var allMenu = [];
    var loadMenu = function() {
        MenuService.loadAll().then(function(menus) {
            allMenu = menus;
            $scope.menus = [].concat(menus);
            $scope.selected = $scope.menus[0];
        });
    };

    var toggleSidenav = function(name) {
        $mdSidenav(name).toggle();
    };

    var selectMenu = function(menu) {
        $scope.selected = angular.isNumber(menu) ? $scope.menus[menu] : menu;
        $scope.toggleSidenav('left');
    };

    var buildToggler = function(navID) {
        var debounceFn = $mdUtil.debounce(function() {
            $mdSidenav(navID).toggle();
        }, 300);
        return debounceFn;
    };

    $scope.selected = null;
    $scope.menus = allMenu;
    $scope.selectMenu = selectMenu;
    $scope.toggleSidenav = toggleSidenav;
    loadMenu();
    $scope.toggleRight = buildToggler('right');

    /***************************************************/
    $scope.now = 'Chargement...';
    var clock = function() {
        $scope.now = new Date();
        $timeout(clock, 1000);
    };
    $timeout(clock, 1000);

    $scope.refresh = function() {
        ipcRenderer.send('refresh_app');
        console.log('refresh app')
    };

    /*****************************************************/
    $scope.addPharm = function() {
        ipcRenderer.send('add_pharmacy');
    };
    $scope.addLaboratory = function() {
        ipcRenderer.send('add_laboratory');
    };
    $scope.addMD = function() {
        ipcRenderer.send('add_md');
    };
    $scope.addProduct = function() {
        ipcRenderer.send('add_product');
    };

    /****************************************************/
    $scope.updateLab = function() {
        ipcRenderer.send('update_laboratory');
    };
    $scope.updateMD = function() {
        ipcRenderer.send('update_md');
    };
    $scope.updateProduct = function() {
        ipcRenderer.send('update_product');
    };

    /*****************************************************/
    $scope.deleteLab = function() {
        ipcRenderer.send('delete_laboratory');
    };
    $scope.deleteMD = function() {
        ipcRenderer.send('delete_md');
    };
    $scope.deleteProduct = function() {
        ipcRenderer.send('delete_product');
    };
});