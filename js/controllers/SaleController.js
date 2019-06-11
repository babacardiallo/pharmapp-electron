ng.controller('SaleController', function($scope, DatabaseService, DisplayService, $rootScope) {

    var displayPharmacy = function() {
        $scope.pharma = $rootScope.thisPharmacy;
    };
    displayPharmacy();

    /*********************************************************/

    var displayCustomers = function() {
        var allCustomers = [];
        DatabaseService.getCustomers().then(function(data) {
            allCustomers = data;
            $scope.customers = [].concat(data);
        });
        $scope.customers = allCustomers;
    };
    displayCustomers();

    /*********************************************************/

    var displayProductsByPharma = function() {
        var allProducts = [];
        DatabaseService.getProductsByPharma($rootScope.pharmaid).then(function(data) {
            allProducts = data;
            $scope.products = [].concat(data);
        });
        $scope.products = allProducts;
    };
    displayProductsByPharma();

    /*********************************************************/

    var displayDoctors = function() {
        var allDoctors = [];
        DatabaseService.getDoctors().then(function(data) {
            allDoctors = data;
            $scope.doctors = [].concat(data);
        });
        $scope.doctors = allDoctors;
    };
    displayDoctors();

    /*********************************************************/

    var newQuantity = 1;
    var getCip = null;
    var getPrice = 0;

    $scope.visible = false;
    var doctorSelected = [];

    var getProductCart = null;
    $scope.listProductsCart = [];
    $scope.deleteProductCart = false;

    var type = "";

    /********************************************************/

    $scope.change = function(quantity, cip, price) {
        getCip = cip;
        newQuantity = parseInt(quantity);
        getPrice = price;
    };

    $scope.selectedCustomer = function(customer) {
        if (customer) {
            DatabaseService.getCustomer(customer.secu).then(function(data) {
                $scope.numsecu = customer.secu;
                $scope.visible = true;
            });
        } else {
            $scope.listProductsCart = [];
            $scope.visible = false;
            newQuantity = 1;
            doctorSelected = [];
        }
    };

    $scope.selectedDoctor = function(doctor) {
        if (doctor) {
            DatabaseService.getDoctor(doctor.id).then(function(data) {
                doctorSelected = data;
            });
        }
    };

    $scope.selectedItemChange = function(product) {
        if (product)
            if (product.quantite > 0)
                getProductCart = product;
    };

    var setPourcentage = function(price, pourcentage) {
        return (price * (pourcentage * 100)) / 100;
    };

    var rounder = function(number) {
        return Number(parseFloat(number).toFixed(2));
    };

    /**************************************************/

    $scope.addProductCart = function() {
        if (getProductCart) {
            newQuantity = 1;
            getProductCart.updateQuantity = 1;
            getProductCart.updatePrice = rounder(getProductCart.prix);
            var pourcentage = getProductCart.pourcentage ? 1 - getProductCart.pourcentage : 1;
            getProductCart.reducePrice = rounder(setPourcentage(getProductCart.prix, pourcentage));
            var indexList = $scope.listProductsCart.indexOf(getProductCart);
            if (indexList <= -1)
                $scope.listProductsCart.push(getProductCart);
        }
    };

    var updateCart = function(cip) {
        var cart = $scope.listProductsCart;
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].cip == cip) {
                cart[i].updateQuantity = newQuantity;
                cart[i].updatePrice = rounder(cart[i].updateQuantity * cart[i].prix);
                var pourcentage = cart[i].pourcentage ? 1 - cart[i].pourcentage : 1;
                cart[i].reducePrice = rounder(setPourcentage(cart[i].updatePrice, pourcentage));
            }
        }
    };

    $scope.getTotalPrice = function() {
        var total = 0;
        var list = $scope.listProductsCart;
        if (getCip) updateCart(getCip);
        for (var i = 0; i < list.length; i++)
            total += list[i].updatePrice;
        return rounder(total);
    };

    $scope.getTotalPriceReduced = function() {
        var total = 0;
        var list = $scope.listProductsCart;
        if (getCip) updateCart(getCip);
        for (var i = 0; i < list.length; i++)
            total += list[i].reducePrice;
        return rounder(total);
    }

    $scope.saveBillingCart = function() {
        type = "facturation";
        var billing = [];
        if (!doctorSelected[0]) DisplayService.alertBox('Erreur', "Vous n'avez pas sélectionné de médecin");
        else if ($scope.listProductsCart.length == 0) DisplayService.alertBox('Erreur', "Le panier est vide");
        else {
            for (var i in $scope.listProductsCart) {
                billing.push({
                    type: type,
                    numsecu: $scope.numsecu,
                    docid: doctorSelected[0].id,
                    cip: $scope.listProductsCart[i].cip,
                    quantite: $scope.listProductsCart[i].updateQuantity,
                    prixtotal: $scope.getTotalPrice(),
                    prixtotalreduit: $scope.getTotalPriceReduced(),
                    datevente: new Date(),
                    pharmaid: $rootScope.pharmaid
                });
                DatabaseService.addTurnover(billing[i]).then(function() {}, function(data) { console.log('facturation erreur', data); });
                DatabaseService.updateQuantityProduct(billing[i].cip, billing[i].quantite).then(function() {}, function(data) {
                    console.log('maj quantite erreur', data);
                    DisplayService.alertBox('Erreur sur la facturation', "Impossible de mettre à jour la quantité prélevée sur le produit");
                });
            }
            DisplayService.alertBox('Facturation réussie', "La facturation a bien été enregistré dans la base de données.<br>La quantité des produits ont été prélevée du stock.");
        }
    };

    $scope.saveSaleCart = function() {
        type = "vente";
        var sale = [];
        if ($scope.listProductsCart.length == 0) DisplayService.alertBox('Erreur', "Le panier est vide");
        else {
            for (var i in $scope.listProductsCart) {
                sale.push({
                    type: type,
                    prixtotal: $scope.getTotalPrice(),
                    prixtotalreduit: $scope.getTotalPrice(),
                    cip: $scope.listProductsCart[i].cip,
                    quantite: $scope.listProductsCart[i].updateQuantity,
                    datevente: new Date(),
                    pharmaid: $rootScope.pharmaid
                });
                DatabaseService.addTurnover(sale[i]).then(function() {}, function(data) { console.log('vente erreur', data); });
                DatabaseService.updateQuantityProduct(sale[i].cip, sale[i].quantite).then(function() {}, function(data) {
                    console.log('maj quantite erreur', data);
                    DisplayService.alertBox('Erreur sur la vente', "Impossible de mettre à jour la quantité prélevée sur le produit");
                });
            }
            DisplayService.alertBox('Vente réussie', "La vente a bien été enregistré dans la base de données.<br>La quantité des produits ont été prélevée du stock.");
        }
    };

    /*************************************************/

    $scope.selected = [];
    $scope.exists = function(item, list) {
        return list.indexOf(item) > -1;
    };

    $scope.toggle = function(item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) list.splice(idx, 1);
        else list.push(item);
    };

    $scope.toggleAll = function(item) {
        if (!$scope.deleteProductCart) {
            $scope.deleteProductCart = true;
            for (var i in item) {
                if ($scope.selected[i] == item[i].cip) continue;
                $scope.selected.push(item[i].cip);
            }
        } else {
            $scope.deleteProductCart = false;
            $scope.selected = [];
        }
    };

    $scope.deleteSelectedProduct = function() {
        var listProductsCart = $scope.listProductsCart;
        var selected = $scope.selected;
        if (selected.length == listProductsCart.length) {
            listProductsCart.splice(0, listProductsCart.length);
        } else {
            for (var i = 0; i < listProductsCart.length; i++) {
                for (var j = 0; j < selected.length; j++) {
                    if (listProductsCart[i].cip == selected[j]) {
                        listProductsCart.splice(i, 1);
                    }
                }
            }
        }
        selected.splice(0, selected.length);
    };
});