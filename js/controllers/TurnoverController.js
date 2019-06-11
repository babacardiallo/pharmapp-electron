ng.controller('TurnoverController', function($scope, DatabaseService, StringService, $rootScope) {

    var displayPharmacy = function() {
        $scope.pharma = $rootScope.thisPharmacy;
    };
    displayPharmacy();

    /****************************************************/

    var displayTurnoverByPharma = function() {
        var allTurnovers = [];
        DatabaseService.getTurnoversByPharma($rootScope.pharmaid).then(function(data) {
            allTurnovers = data;
            for (var i = 0; i < allTurnovers.length; i++) {
                allTurnovers[i].type = StringService.capitalize(allTurnovers[i].type);
            }
            $scope.turnovers = [].concat(data);
        });
        $scope.turnovers = allTurnovers;
    };
    displayTurnoverByPharma();

    /****************************************************/

    var displayProductsByPharma = function() {
        var allProducts = [];
        DatabaseService.getProductsByPharma($rootScope.pharmaid).then(function(data) {
            allProducts = data;
            $scope.products = [].concat(data);
        });
        $scope.products = allProducts;
    };
    displayProductsByPharma();

    /****************************************************/

    var displayTotalTurnoverByPharma = function() {
        var totalTurnover = [];
        DatabaseService.getTotalTurnoverByPharma($rootScope.pharmaid).then(function(data) {
            totalTurnover = data;
            $scope.total = [].concat(data);
        });
        $scope.total = totalTurnover;
    };
    displayTotalTurnoverByPharma();

    /****************************************************/

    var displayTotalSaleByPharma = function() {
        var totalTurnover = [];
        DatabaseService.getTotalSaleByPharma($rootScope.pharmaid).then(function(data) {
            totalTurnover = data;
            $scope.totalSale = [].concat(data);
        });
        $scope.totalSale = totalTurnover;
    };
    displayTotalSaleByPharma();

    /****************************************************/

    var displayTotalBillingByPharma = function() {
        var totalTurnover = [];
        DatabaseService.getTotalBillingByPharma($rootScope.pharmaid).then(function(data) {
            totalTurnover = data;
            $scope.totalBilling = [].concat(data);
        });
        $scope.totalBilling = totalTurnover;
    };
    displayTotalBillingByPharma();

    /****************************************************/

    $scope.sumTotalTurnover = function() {
        var totales = 0;
        for (var i = 0; i < $scope.total.length; i++) {
            totales += $scope.total[i].prixtotal;
        }
        return totales;
    };

    $scope.sumTotalReducedTurnover = function() {
        var total = 0;
        for (var i = 0; i < $scope.total.length; i++) {
            if ($scope.total[i].prixtotalreduit == null)
                total += $scope.total[i].prixtotal;
            else
                total += $scope.total[i].prixtotalreduit;
        }
        return total;
    };

    $scope.sumTotalSale = function() {
        var total = 0;
        for (var i = 0; i < $scope.totalSale.length; i++) {
            total += $scope.totalSale[i].prixtotal;
        }
        return total;
    };

    $scope.sumTotalBilling = function() {
        var total = 0;
        for (var i = 0; i < $scope.totalBilling.length; i++) {
            total += $scope.totalBilling[i].prixtotal;
        }
        return total;
    };

    $scope.sumTotalReducedBilling = function() {
        var total = 0;
        for (var i = 0; i < $scope.totalBilling.length; i++) {
            total += $scope.totalBilling[i].prixtotalreduit;
        }
        return total;
    };

});