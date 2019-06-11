ng.controller('ProductController', function($scope, $mdDialog, DatabaseService, DisplayService, $rootScope) {

    var br = function(input) {
        if (input) return input.replace(/\n/g, '<br>');
    };

    var displayPharmacy = function() {
        $scope.pharma = $rootScope.thisPharmacy;
    };
    displayPharmacy();

    /**********************************************************/

    var pharmaid = null;

    var displayPharmacies = function() {
        var allPharmacies = [];
        DatabaseService.getPharmacies().then(function(data) {
            allPharmacies = data;
            $scope.pharmacies = [].concat(data);
        });
        $scope.pharmacies = allPharmacies;
    };
    displayPharmacies();

    $scope.selectedPharmacy = function(pharmacy) {
        if (pharmacy) {
            pharmaid = pharmacy.id;
            displayProductsByPharma(pharmaid);
        }
    };

    $scope.activeIngredients = [];
    var getActiveIngredient = function(cip) {
        DatabaseService.getActiveIngredient(cip).then(function(data) {
            $scope.activeIngredients.push({ cip: cip, pa: data });
        });
    };

    /**********************************************************/

    var displayProductsByPharma = function(id) {
        var allProducts = [];
        DatabaseService.getProductsByPharma(id).then(function(data) {
            allProducts = data;
            for (var i = 0; i < allProducts.length; i++) {
                getActiveIngredient(allProducts[i].cip);
                allProducts[i].description = br(allProducts[i].description);
            }
            $scope.products = [].concat(data);
        });
        $scope.products = allProducts;
    };
    displayProductsByPharma($rootScope.pharmaid);

    /**********************************************************/

    var displayClasses = function() {
        var allClasses = [];
        DatabaseService.getClasses().then(function(data) {
            allClasses = data;
            $scope.classes = [].concat(data);
        });
        $scope.classes = allClasses;
    };
    displayClasses();

    /**********************************************************/

    var displayForms = function() {
        var allForms = [];
        DatabaseService.getForms().then(function(data) {
            allForms = data;
            $scope.formes = [].concat(data);
        });
        $scope.formes = allForms;
    };
    displayForms();

    /**********************************************************/

    var displayActiveIngredients = function() {
        var allActiveIngredients = [];
        DatabaseService.getActiveIngredients().then(function(data) {
            allActiveIngredients = data;
            $scope.principes = [].concat(data);
        });
        $scope.principes = allActiveIngredients;
    };
    displayActiveIngredients();

    /**********************************************************/

    var displayVignettes = function() {
        var allVignettes = [];
        DatabaseService.getVignettes().then(function(data) {
            allVignettes = data;
            $scope.vignettes = [].concat(data);
        });
        $scope.vignettes = allVignettes;
    };
    displayVignettes();

    /**********************************************************/

    $scope.allPrincipes = [];
    $scope.selectedItemChange = function(produit) {
        if (produit) $scope.allPrincipes.push(produit.nom);
    };

    $scope.addProduct = function() {
        var codecip = $scope.cip;
        var newProduct = {
            cip: codecip,
            nom: $scope.name,
            description: $scope.description,
            boitede: $scope.boitede,
            dosage: $scope.dosage,
            nom_Classe: $scope._classes,
            libelle: $scope._formes,
            couleur: $scope._vignettes,
            quantite: parseInt($scope.quantity)
        };
        var priceProduct = {
            prix: $scope.price,
            datechange: new Date(),
            cip: codecip
        };

        DatabaseService.addProduct(newProduct).then(() => {

            for (var i = 0; i < $scope.allPrincipes.length; i++) {
                DatabaseService.addActiveIngredient(codecip, $scope.allPrincipes[i]).then(function() {}, function() {
                    DisplayService.alertBox('Erreur sur les principes actifs', "Une erreur est survenue lors de l'enregistrement");
                });
            }
            DatabaseService.addPrice(priceProduct).then(() => {}, () => {
                DisplayService.alertBox('Erreur sur le prix du produit', "Une erreur est survenue lors de l'enregistrement");
            });
            DatabaseService.addProductByPharma(pharmaid, codecip).then(() => {}, () => {
                DisplayService.alertBox("Erreur sur l'insertion du produit dans une pharmacie", "Une erreur est survenue lors de l'enregistrement");
            });
            DisplayService.alertBox('Enregistrement réussi', "Un nouveau produit a été enregistré sur l'application");

        }, error => {
            DisplayService.alertBox('Erreur sur le produit', "Une erreur est survenue lors de l'enregistrement");
        });
    };

    var getCip = null;
    var getPrice = 0;
    $scope.selectProduct = function(id) {
        getCip = id;
        DatabaseService.getProduct(id).then(data => {
            $scope.name = data[0].nom;
            $scope.description = data[0].description;
            $scope.boitede = data[0].boitede;
            $scope.dosage = data[0].dosage;
            $scope._classes = data[0].nom_Classe;
            $scope._formes = data[0].libelle;
            $scope._vignettes = data[0].couleur;
            $scope.quantity = data[0].quantite;
            $scope.price = data[0].prix;
            getPrice = data[0].prix;
        })
    };

    $scope.updateProduct = function() {
        var uptProduct = {
            nom: $scope.name,
            description: $scope.description,
            boitede: $scope.boitede,
            dosage: $scope.dosage,
            nom_Classe: $scope._classes,
            libelle: $scope._formes,
            couleur: $scope._vignettes,
            quantite: parseInt($scope.quantity)
        };
        var uptPrice = {
            prix: $scope.price,
            datechange: new Date()
        };

        DatabaseService.updateProduct(uptProduct, getCip).then(() => {

            if (uptPrice.prix != getPrice) {
                DatabaseService.updatePrice(uptPrice, getCip).then(() => {}, () => {
                    DisplayService.alertBox('Erreur', "Une erreur est survenue lors de la mise à jour");
                });
            }
            DisplayService.alertBox('Mise à jour réussie', "Un produit a été mis à jour sur l'application");

        }, error => {
            DisplayService.alertBox('Erreur', "Une erreur est survenue lors de la mise à jour");
        });
    };

    $scope.deleteProduct = function() {
        var confirm = DisplayService.confirmBox('Suppression', "Voulez-vous supprimer ce produit?");
        $mdDialog.show(confirm).then(() => {
            var cip = $scope._products;
            DatabaseService.deletePrice(cip).then(() => {}, data => {
                DisplayService.alertBox('Erreur', "Une erreur est survenue lors de la suppression");
            });
            DatabaseService.deleteProduct(cip).then(() => {
                DisplayService.alertBox('Suppression réussie', "Le produit a été supprimé de l'application");
            }, error => {
                DisplayService.alertBox('Erreur', "Une erreur est survenue lors de la suppression");
            });
        });
    };
});