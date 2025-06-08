export default function Doc() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">Documentation</h1>

      <section id="loss">
        <h2 className="text-lg font-semibold">Loss</h2>
        <p>
          La <strong>loss</strong> représente l'erreur du modèle sur les données
          d'entraînement. Elle diminue en général au fil des epochs si le
          modèle apprend correctement.
        </p>
      </section>

      <section id="val_loss">
        <h2 className="text-lg font-semibold">Val loss</h2>
        <p>
          La <strong>val loss</strong> correspond à la même mesure, mais calculée sur
          l'ensemble de validation afin d'évaluer la généralisation du modèle.
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
        <h2 className="text-lg font-semibold">Val accuracy</h2>
        <p>
          La <strong>val accuracy</strong> est l'accuracy calculée sur les données
          de validation. Elle permet de vérifier le comportement du modèle sur
          des exemples qu'il n'a pas vus pendant l'entraînement.
        </p>
      </section>
    </div>
  );
}
