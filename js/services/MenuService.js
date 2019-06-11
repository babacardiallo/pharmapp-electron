ng.service('MenuService', function($q) {
  	var menu = [{
    	  name: 'Tableau de bord',
      	iconurl: 'fa-home',
        template: './main/pages/dashboard.html'
  	}, {
        name: "Chiffre d'affaire",
        iconurl: 'fa-money',
        template: './main/pages/turnover.html'
    }, {
        name: 'Facturation',
        iconurl: 'fa-shopping-cart',
        template: './main/pages/billing.html'
    }, {
        name: 'Vente',
        iconurl: 'fa-eur',
        template: './main/pages/sale.html'
    }, {
        name: 'Produits',
        iconurl: 'fa-plus-square',
        template: './main/pages/product.html'
    }, {
      	name: 'Laboratoires',
      	iconurl: 'fa-flask',
        template: './main/pages/laboratory.html'
  	}, {
        name: 'Médecins',
        iconurl: 'fa-user-md',
        template: './main/pages/doctor.html'
    }];

  	return {
      	loadAll: function() {
          	// Simulate async nature of real remote calls
          	return $q.when(menu);
      	}
  	};
});