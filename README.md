# Mellotron :musical_keyboard:

![image](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white) ![image](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![image](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white) ![image](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white) ![image](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

[Mellotron](https://fr.wikipedia.org/wiki/Mellotron) est un site d'archivage des chansons des constitutions Matbay. Les buts principaux du projet était de :
* Regrouper en un seul endroit toutes les chansons passées dans une constitution Matbay.
* Permettre de faire une recherche parmi toutes ces données.
* Pouvoir personnaliser la recherche sur plusieurs critères.

L'application a été généré à partir de [Angular CLI](https://github.com/angular/angular-cli) (version 13.3.7).

## Commandes Utiles

```
// Installer les dépendances
npm i

// Lancer l'application localement (disponible sur http://localhost:4200/)
ng serve

// Générer l'application (fichiers disponible dans /dist)
ng build

// Mettre à jour les pseudos des utilisateurs
node kalimba.js
```

La plupart des dépendances proviennent d'Angular, mise à part [`@angular/material`](https://material.angular.io/guide/getting-started), [`chelys`](https://github.com/TableauBits/Chelys) et [`node-fetch`](https://www.npmjs.com/package/node-fetch) qui ont été ajoutés au cours du projet.

Il n'y a pas besoin de mettre à jour soi-même les pseudos des utilisateurs en appelant `kalimba.js`, un workflow dans le CI le fera à chaque ouverture de PR.

## Notes

Mellotron est un projet d'archive statique et ne se mettra donc pas à jour automatiquement. Aussi, puisque que les données des chansons viennent de plusieurs sources différentes, il est possible que le format de certains champs (ex: Auteur) ne soit pas cohérent entre différentes chansons.
