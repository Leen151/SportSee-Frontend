# SportSee Dashboard

Tableau de bord d'analytics de coaching sportif.

> [!Note]
> Ce projet est réalisé dans le cadre d'une formation.
> Il contient donc des commentaires qui servent de notes et que l'on ne trouverait pas dans du code déployé.

### Installation des dépendances

```shell
npm install
```

### Lancement de l'application

Pour démarrer l'application en mode développement, utilisez la commande suivante :

```shell
npm run dev
```

### Technologies utilisées

- **React** : Bibliothèque JavaScript pour la création d'interfaces utilisateur.
- **Vite** : Outil de construction rapide et léger pour les projets React.
- **Recharts** : Librairie pour créer des graphiques interactifs.
- **npm** : Gestionnaire de paquets JavaScript.

### Récupération des données

Les données peuvent être récupérer depuis un fichier json (mock) ou depuis l'api.
Le service dataService permet de choisir l'une ou l'autre de ses 2 option grace à la valeur de la variable useAPI.
Le prenom de l'utilisateur 12 a été modifié dans les données mockées afin de souligner la diffférence.

### Auteurs

Ce projet a été réalisé par **Leen151**.
