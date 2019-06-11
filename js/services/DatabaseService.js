var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "babacar",
    password: "salimata60",
    database: "pharmapp"
});

ng.service('DatabaseService', function($q) {
    return {
        getCustomers: function() {
            var deferred = $q.defer();
            var query = "SELECT * FROM client";
            connection.query(query, function(err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        },
        getCustomer: function(secu) {
            var deferred = $q.defer();
            //var query = "SELECT * FROM  client WHERE CONCAT(prenom,  ' ', nom) LIKE  '%" + query +"%' OR CONCAT(nom, ' ', prenom) LIKE '%"+ query +"%' OR secu = '" + query + "'";
            var query = "SELECT * FROM client WHERE secu = '" + secu + "'";
            connection.query(query, function(err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        },
        /**************************************************/
        addEmployee: function(employee) {
            var deferred = $q.defer();
            var query = "INSERT INTO employe SET ?";
            connection.query(query, employee, function(err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res.insertId);
            });
            return deferred.promise;
        },
        getEmployee: function(login) {
            var deferred = $q.defer();
            var query = "SELECT * FROM employe WHERE login = '" + login + "'";
            connection.query(query, [login], function(err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        },
        getEmployees: function() {
            var deferred = $q.defer();
            var query = "SELECT * FROM employe";
            connection.query(query, function(err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        },
        /**************************************************/
        getLaboratories: function() {
            var deferred = $q.defer();
            var query = "SELECT * FROM laboratoire";
            connection.query(query, function(err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        },
        addLaboratory: function(lab) {
            var deferred = $q.defer();
            var query = "INSERT INTO laboratoire SET ?";
            connection.query(query, lab, function(err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res.insertId);
            });
            return deferred.promise;
        },
        getLaboratory: function(id) {
            var deferred = $q.defer();
            var query = "SELECT * FROM laboratoire WHERE id = " + id;
            connection.query(query, function(err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        },
        updateLaboratory: function(lab, id) {
            var deferred = $q.defer();
            var query = "UPDATE laboratoire SET ? WHERE id = ?";
            connection.query(query, [lab, id], function(err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        },
        deleteLaboratory: function(id) {
            var deferred = $q.defer();
            var query = "DELETE FROM laboratoire WHERE id = ?";
            connection.query(query, [id], function(err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res.affectedRows);
            });
            return deferred.promise;
        },
        /**************************************************/
        getProducts: function() {
            var deferred = $q.defer();
            //var query = "SELECT * FROM produit p INNER JOIN comprendre pa ON p.cip = pa.cip LEFT JOIN prix ON p.cip = prix.cip INNER JOIN vignette v ON p.couleur = v.couleur ORDER BY nom";
            //var query = "SELECT * FROM produit p LEFT JOIN prix ON p.cip = prix.cip INNER JOIN vignette v ON p.couleur = v.couleur ORDER BY nom";
            var query = "SELECT * FROM produit p " +
                "LEFT JOIN prix ON p.cip = prix.cip " +
                "INNER JOIN vignette v ON p.couleur = v.couleur " +
                "ORDER BY nom";
            connection.query(query, function(err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        },
        getProductsByPharma: function(id) {
            var deferred = $q.defer();
            var query = "SELECT produit.*, prix.*, vignette.* FROM produit " +
                "LEFT JOIN prix ON produit.cip = prix.cip " +
                "INNER JOIN vignette ON produit.couleur = vignette.couleur " +
                "INNER JOIN contenir ON produit.cip = contenir.cip " +
                "INNER JOIN pharmacie ON pharmacie.id = contenir.id " +
                "WHERE pharmacie.id = " + id + " ORDER BY nom";
            connection.query(query, function(err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        },
        getProduct: function(cip) {
            var deferred = $q.defer();
            var query = "SELECT * FROM produit LEFT JOIN prix ON produit.cip = prix.cip WHERE produit.cip = '" + cip + "'";
            connection.query(query, function(err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        },
        getProductByPharma: function(id, cip) {
            var deferred = $q.defer();
            var query = "SELECT produit.*, prix.*, vignette.* FROM produit " +
                "LEFT JOIN prix ON produit.cip = prix.cip " +
                "INNER JOIN vignette ON produit.couleur = vignette.couleur " +
                "INNER JOIN contenir ON produit.cip = contenir.cip " +
                "INNER JOIN pharmacie ON pharmacie.id = contenir.id " +
                "WHERE pharmacie.id = " + id + " and produit.cip = '" + cip + "'";
            connection.query(query, function(err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        },
        addProduct: function(product) {
            var deferred = $q.defer();
            var query = "INSERT INTO produit SET ?";
            connection.query(query, product, function(err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res.insertId);
            });
            return deferred.promise;
        },
        addProductByPharma: function(pharmaid, cip) {
            var deferred = $q.defer();
            var query = "INSERT INTO contenir SET id=" + pharmaid + ", cip=" + cip;
            connection.query(query, function(err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res.insertId);
            });
            return deferred.promise;
        },
        addPrice: function(product) {
            var deferred = $q.defer();
            var query = "INSERT INTO prix SET ?";
            connection.query(query, product, function(err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res.insertId);
            });
            return deferred.promise;
        },
        updateProduct: function(product, cip) {
            var deferred = $q.defer();
            var query = "UPDATE produit SET ? WHERE cip = ?";
            connection.query(query, [product, cip], function(err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        },
        updatePrice: function(product, cip) {
            var deferred = $q.defer();
            var query = "UPDATE prix SET ? WHERE cip = ?";
            connection.query(query, [product, cip], function(err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        },
        deleteProduct: function(cip) {
            var deferred = $q.defer();
            var query = "DELETE FROM produit WHERE cip = ?";
            connection.query(query, [cip], function(err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res.affectedRows);
            });
            return deferred.promise;
        },
        deletePrice: function(cip) {
            var deferred = $q.defer();
            var query = "DELETE FROM prix WHERE cip = ?";
            connection.query(query, [cip], function(err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res.affectedRows);
            });
            return deferred.promise;
        },
        getClasses: function() {
            var deferred = $q.defer();
            var query = "SELECT * FROM classe";
            connection.query(query, function(err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        },
        getForms: function() {
            var deferred = $q.defer();
            var query = "SELECT * FROM forme";
            connection.query(query, function(err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        },
        getVignettes: function() {
            var deferred = $q.defer();
            var query = "SELECT * FROM vignette";
            connection.query(query, function(err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        },
        /***************************************************/
        getActiveIngredients: function() {
            var deferred = $q.defer();
            var query = "SELECT * FROM principeactif";
            connection.query(query, function(err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        },
        getActiveIngredient: function(cip) {
            var deferred = $q.defer();
            var query = "SELECT principeactif FROM comprendre WHERE cip = '" + cip + "'";
            connection.query(query, function(err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        },
        addActiveIngredient: function(cip, ai) {
            var deferred = $q.defer();
            var query = "INSERT INTO comprendre SET cip = '" + cip + "', principeactif = '" + ai + "'";
            connection.query(query, function(err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res.insertId);
            });
            return deferred.promise;
        },
        /**************************************************/
        getDoctors: function() {
            var deferred = $q.defer();
            var query = "SELECT * FROM docteur";
            connection.query(query, function(err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        },
        getDoctor: function(id) {
            var deferred = $q.defer();
            var query = "SELECT * FROM docteur WHERE id = " + id;
            connection.query(query, function(err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        },
        addDoctor: function(doctor) {
            var deferred = $q.defer();
            var query = "INSERT INTO docteur SET ?";
            connection.query(query, doctor, function(err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res.insertId);
            });
            return deferred.promise;
        },
        updateDoctor: function(doctor, id) {
            var deferred = $q.defer();
            var query = "UPDATE docteur SET ? WHERE id = ?";
            connection.query(query, [doctor, id], function(err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        },
        deleteDoctor: function(id) {
            var deferred = $q.defer();
            var query = "DELETE FROM docteur WHERE id = ?";
            connection.query(query, [id], function(err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res.affectedRows);
            });
            return deferred.promise;
        },
        /**************************************************/
        addTurnover: function(sale) {
            var deferred = $q.defer();
            var query = "INSERT INTO chiffreaffaire SET ?";
            connection.query(query, sale, function(err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res.insertId);
            });
            return deferred.promise;
        },
        getTurnovers: function() {
            var deferred = $q.defer();
            var query = "SELECT * FROM chiffreaffaire";
            connection.query(query, function(err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        },
        getTurnoversByPharma: function(id) {
            var deferred = $q.defer();
            var query = "SELECT * FROM chiffreaffaire WHERE pharmaid=" + id;
            connection.query(query, function(err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        },
        updateQuantityProduct: function(cip, quantity) {
            var deferred = $q.defer();
            var query = "UPDATE produit SET quantite=quantite-" + quantity + " WHERE cip='" + cip + "'";
            connection.query(query, function(err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        },
        getTotalTurnover: function() {
            var deferred = $q.defer();
            var query = "SELECT prixtotal, prixtotalreduit FROM chiffreaffaire GROUP BY prixtotal, prixtotalreduit";
            connection.query(query, function(err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        },
        getTotalTurnoverByPharma: function(id) {
            var deferred = $q.defer();
            var query = "SELECT prixtotal, prixtotalreduit FROM chiffreaffaire WHERE pharmaid=" + id + " ";
            connection.query(query, function(err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        },
        getTotalSale: function() {
            var deferred = $q.defer();
            var query = "SELECT prixtotal, prixtotalreduit FROM chiffreaffaire WHERE type='vente' GROUP BY prixtotal";
            connection.query(query, function(err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        },
        getTotalSaleByPharma: function(id) {
            var deferred = $q.defer();
            var query = "SELECT prixtotal, prixtotalreduit FROM chiffreaffaire WHERE type='vente' AND pharmaid=" + id + "";
            connection.query(query, function(err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        },
        getTotalBilling: function() {
            var deferred = $q.defer();
            var query = "SELECT prixtotal, prixtotalreduit FROM chiffreaffaire WHERE type='facturation' GROUP BY prixtotal";
            connection.query(query, function(err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        },
        getTotalBillingByPharma: function(id) {
            var deferred = $q.defer();
            var query = "SELECT prixtotal, prixtotalreduit FROM chiffreaffaire WHERE type='facturation' AND pharmaid=" + id + "";
            connection.query(query, function(err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        },
        /**************************************************/
        getPharmacies: function() {
            var deferred = $q.defer();
            var query = "SELECT * FROM pharmacie";
            connection.query(query, function(err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        },
        getPharmacy: function(id) {
            var deferred = $q.defer();
            var query = "SELECT * FROM pharmacie WHERE id=" + id;
            connection.query(query, function(err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        },
        addPharmacy: function(pharmacy) {
            var deferred = $q.defer();
            var query = "INSERT INTO pharmacie SET ?";
            connection.query(query, pharmacy, function(err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res.insertId);
            });
            return deferred.promise;
        }
    }
});