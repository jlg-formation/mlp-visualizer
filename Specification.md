# Spécification du projet – Visualisation interactive d’un MLP dans le navigateur

## 🎯 Objectif

Créer une application web 100% front-end qui illustre de manière interactive le fonctionnement d’un petit réseau de neurones multicouches (MLP), capable de reconnaître des chiffres manuscrits simples (8×8). Le site permet de visualiser les activations des neurones, modifier l’architecture du réseau, entraîner le modèle dans le navigateur et explorer les concepts de base du machine learning via une documentation intégrée.

---

## 🧱 Stack technique

- **Framework** : React
- **Build Tool** : Vite
- **Style** : TailwindCSS v4
- **Machine Learning** : TensorFlow.js
- **Affichage dynamique** : SVG (pour les neurones et connexions)
- **Routing** : React Router DOM
- **Visualisation de données** : Chart.js ou alternative légère

---

## ⚙️ Fonctionnalités principales

### 1. Chargement des données

- Jeu de données : `digits` (8×8) de `scikit-learn`, exporté en JSON.
- Chargé automatiquement au démarrage.
- Séparation en deux ensembles :
  - 80% : entraînement
  - 20% : test

-### 2. Visualisation du MLP

- Affichage des couches sous forme de cercles connectés. La couche de sortie est représentée par des triangles pour la distinguer des couches cachées :
  - Vert : neurone activé (valeur > 0.5)
  - Noir : neurone peu ou pas activé
- Connections visibles entre chaque couche.
- Option : opacité ou épaisseur des lignes = poids synaptiques.

### 3. Inférence

- Utilisateur peut :
  - Sélectionner une image du jeu de test
  - Dessiner son propre chiffre (canvas 8×8)
- Le MLP affiche :
  - Les activations de chaque couche
  - La prédiction finale (0 à 9)
  - Les probabilités sous forme de barres

### 4. Entraînement

- MLP initial par défaut (pré-entraîné), mais possibilité de réentraîner :
  - Architecture par défaut :
    - Entrée : 64
    - Cachées : [32, 16] (modifiable)
    - Sortie : 10 neurones (softmax)
  - Fonction d’activation : ReLU (cachées), softmax (sortie)
  - Perte : `categoricalCrossentropy`
  - Optimiseur : Adam
- Paramétrage utilisateur :
  - Learning rate
  - Nombre d’époques
  - Batch size
- Affichage en temps réel :
  - Courbe de perte (loss)
  - Courbe d’exactitude (accuracy)
- Possibilité d’interrompre l'entraînement à tout moment

### 5. Modification du modèle

- Interface pour modifier :
  - Nombre de couches cachées
  - Nombre de neurones par couche
  - Fonction d’activation
- Sauvegarde du modèle en JSON localement
- Chargement d’un modèle précédemment sauvegardé

### 6. Ajout de données personnalisées

- L’utilisateur peut dessiner un chiffre dans un canvas
- Ce chiffre peut être :
  - Classé manuellement par l’utilisateur
  - Ajouté au dataset d’entraînement
  - Utilisé comme test après entraînement

### 7. Documentation interactive

- Tous les termes techniques sont interactifs :
  - Surbrillance au survol
  - Tooltip contenant une brève définition
  - Lien vers `/doc#<mot-clé>` pour une définition complète
- Page `/doc` unique avec ancres HTML :
  - Explication des concepts : epoch, learning rate, loss, etc.
  - Schémas, exemples et animations pédagogiques
  - Navigation interne fluide et croisée entre définitions

---

## 📂 Arborescence indicative

```
mlp-visualizer/
├── public/
│ └── digits.json
├── src/
│ ├── components/
│ │ ├── MLPGraph.tsx
│ │ ├── CanvasInput.tsx
│ │ ├── TrainingPanel.tsx
│ │ └── TooltipTerm.tsx
│ ├── pages/
│ │ ├── Home.tsx
│ │ └── Doc.tsx
│ ├── lib/
│ │ ├── model.ts
│ │ └── data.ts
│ ├── styles/
│ │ └── tailwind.css
│ ├── App.tsx
│ └── main.tsx
├── doc/
│ └── glossary.md
├── tailwind.config.ts
├── vite.config.ts
└── Specification.md
```

---

## ✅ Extensions futures possibles

- Export PNG/SVG des visualisations
- Historique d'entraînements
- Mode compétition (entrainer son modèle et le tester sur un score commun)
- Intégration dans un notebook pédagogique ou MOOC

---

## 👤 Public cible

- Étudiants en informatique ou IA
- Développeurs curieux de comprendre les MLP
- Enseignants voulant illustrer les réseaux de neurones
- Grand public intéressé par l’IA de manière visuelle

---

## 📜 Licence

Projet open source sous licence MIT.

## Auteur

Jean-Louis GUENEGO <jlguenego@gmail.com>
