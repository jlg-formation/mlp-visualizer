# Affichage en temps réel du nombre de paramètres du MLP

## Contexte

L'application visualise un petit MLP qui reconnaît des chiffres 8x8. L'utilisateur configure l'architecture du réseau (couches cachées) et souhaite voir, au fil de cette configuration, combien de paramètres le réseau possède. L'objectif est de comprendre l'impact de la taille du réseau sur l'entraînement, d'équilibrer la complexité du modèle par rapport aux données, et de rendre visible à des fins pédagogiques ce qu'est un paramètre.

## Objectif

Afficher en temps réel, pour le MLP en cours de configuration, le nombre total de paramètres ainsi que le détail des poids et des biais, avec un calcul couche par couche et les totaux correspondants.

## Périmètre fonctionnel

- Mise à jour en temps réel à chaque modification de la configuration des couches cachées.
- Affichage disponible sur la page Board et sur la page Model.
- Affichage intégré au composant `MLPGraph`, en dessous du graphe. Le graphe reste la partie principale de la vue, le bloc de paramètres est secondaire.
- Calcul pris en compte pour toutes les couches du réseau, y compris la couche d'entrée (64 unités) et la couche de sortie (10 unités).
- Détail couche par couche :
  - nombre de poids = unités d'entrée × unités de sortie de la couche ;
  - nombre de biais = unités de sortie de la couche ;
  - sous-total par couche (poids + biais).
- Totaux affichés : total des poids, total des biais, et total général des paramètres.
- Empreinte mémoire affichée dans la même vue que le nombre de paramètres.
- Format d'affichage des nombres avec séparateurs de milliers (ex. 2 778).

## Hors périmètre

- Ajout ou modification de l'architecture autrement que par la configuration existante.
- Affichage séparé pendant l'entraînement (non demandé).
- Vue dédiée séparée pour l'empreinte mémoire.

## Utilisateurs cibles

Utilisateurs de l'application qui configurent le MLP sur les pages Board et Model, à des fins d'apprentissage et d'analyse de la complexité du modèle.

## Contraintes techniques

- Front-end uniquement (React 19, TypeScript, Vite, Zustand, TensorFlow.js).
- La logique de calcul reste dans `src/lib/` et l'état dans `src/stores/`, conformément à `AGENTS.md`.
- Source des couches : `layers` du store `useMLPStore` (couches cachées, par défaut `[32, 16]`), auxquelles s'ajoutent les couches fixes d'entrée (64) et de sortie (10).
- Méthode de calcul : calcul théorique couche par couche à partir de la liste des couches.

## Critères de succès

- Pour le modèle par défaut `[32, 16]`, l'affichage indique un total de **2 778** paramètres :
  - couche 1 : 64 × 32 + 32 = 2 080 ;
  - couche 2 : 32 × 16 + 16 = 528 ;
  - couche 3 : 16 × 10 + 10 = 170 ;
  - total : 2 778.
- Le total se met à jour immédiatement lorsque l'utilisateur modifie les couches cachées.
- Le détail par couche et les totaux de poids et de biais sont cohérents avec le total général.
- Les nombres sont formatés avec séparateurs de milliers.

## Points en suspens

- Aucun point ouvert après clarification.
