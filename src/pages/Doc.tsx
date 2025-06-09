export default function Doc() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-xl font-bold">Documentation</h1>

      <section id="loss">
        <h2 className="text-lg font-semibold">Loss</h2>
        <p>
          La <strong>loss</strong> représente l'erreur du modèle sur les données
          d'entraînement. Elle diminue en général au fil des epochs si le modèle
          apprend correctement.
        </p>
      </section>

      <section id="val_loss">
        <h2 className="text-lg font-semibold">Val loss</h2>
        <p>
          La <strong>val loss</strong> correspond à la même mesure, mais
          calculée sur l'ensemble de validation afin d'évaluer la généralisation
          du modèle.
        </p>
      </section>

      <section id="accuracy">
        <h2 className="text-lg font-semibold">Accuracy</h2>
        <p>
          L'<strong>accuracy</strong> indique la proportion de prédictions
          correctes sur les données d'entraînement.
        </p>
      </section>

      <section id="val_accuracy">
        <h2 className="text-lg font-semibold">Val accuracy</h2>
        <p>
          La <strong>val accuracy</strong> est l'accuracy calculée sur les
          données de validation. Elle permet de vérifier le comportement du
          modèle sur des exemples qu'il n'a pas vus pendant l'entraînement.
        </p>
      </section>

      <section id="epoch">
        <h2 className="text-lg font-semibold">Epoch</h2>
        <p>
          Une <strong>epoch</strong> correspond à un passage complet sur
          l'ensemble des données d'entraînement. Le nombre total d'epochs
          indique combien de fois le modèle a vu toutes les données depuis la
          dernière réinitialisation.
        </p>
      </section>

      <section id="learning_rate">
        <h2 className="text-lg font-semibold">Learning rate</h2>
        <p>
          Le <strong>learning rate</strong> ou taux d'apprentissage contrôle la
          vitesse à laquelle les poids du réseau sont ajustés pendant
          l'entraînement. Une valeur trop élevée peut faire diverger
          l'apprentissage alors qu'une valeur trop faible peut le rendre très
          lent.
        </p>
      </section>

      <section id="batch_size">
        <h2 className="text-lg font-semibold">Batch size</h2>
        <p>
          Le <strong>batch size</strong> correspond au nombre d'exemples traités
          avant de mettre à jour les poids du modèle. Des valeurs petites
          donnent des mises à jour plus fréquentes mais bruitées, tandis qu'une
          valeur plus grande nécessite plus de mémoire mais offre une estimation
          plus stable du gradient.
        </p>
      </section>

      <section id="dead_neurons">
        <h2 className="text-lg font-semibold">Neurones morts</h2>
        <p>
          Un neurone est dit <strong>mort</strong> lorsqu'il reste toujours
          inactif, quelle que soit l'entrée. Pour un réseau utilisant des
          fonctions ReLU, cela se produit quand la sortie du neurone est
          constamment inférieure ou égale à zéro. Cela peut provenir d'une
          initialisation défavorable ou d'un taux d'apprentissage mal choisi.
          Les neurones morts n'apportent rien au modèle. Ils sont signalés dans
          le graphique par la couleur rouge lorsque l'option "Show dead" est
          activée.
        </p>
      </section>
    </div>
  );
}
