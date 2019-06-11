PharmApp
===

Introduction
---

PharmApp est une application évolutive avec une base de données MySQL sur la gestion et la vente de médicaments dans une ou plusieurs pharmacies.

Cette application est basée sur une technologie entièrement JavaScript avec essentiellement [AngularJS](https://angularjs.org/) et [Electron](http://electron.atom.io/) permettant de créer des application desktop multiplateformes.

Prérequis
---

Il faut au préalable avoir télécharger [NodeJS](https://nodejs.org/en/) pour accéder aux commandes [NPM](https://www.npmjs.com/) ainsi qu'un SGBD MySQL tel que *PhpMyAdmin* sur votre ordinateur.

Installation
---

Il faut d'abord ajouter la base de données dans votre SGBD qui se situe dans `data/pharmapp.js`.

Ensuite, on se rend sur le projet (`cd /your/path/pharmapp`) et on exécute la commande :
```
npm install
```
Un nouveau répertoire a été créé. Il s'agit du répertoire `node_modules/` qui contient toutes les librairies associées au projet.

Maintenant pour exécuter le projet, il suffit d'écrire la commande :
```
npm start
```
