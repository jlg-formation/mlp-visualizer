import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { useMLPStore } from "../stores/useMLPStore";

export const TrainingPanel: React.FC = () => {
  const model = useMLPStore((s) => s.model);
  const trainData = useMLPStore((s) => s.trainData);
  const testData = useMLPStore((s) => s.testData);
  const [learningRate, setLearningRate] = useState(0.01);
  const [epochs, setEpochs] = useState(10);
  const [batchSize, setBatchSize] = useState(32);

  const training = useMLPStore((s) => s.training);
  const setTraining = useMLPStore((s) => s.setTraining);
  const updateHistory = useMLPStore((s) => s.updateHistory);
  const reinitializeModel = useMLPStore((s) => s.reinitializeModel);

  const startTraining = async () => {
    if (!model || !trainData || !testData) return;
    setTraining(true);

    model.compile({
      optimizer: tf.train.adam(learningRate),
      loss: "categoricalCrossentropy",
      metrics: ["accuracy"],
    });

    await model.fit(trainData.xs, trainData.ys, {
      epochs,
      batchSize,
      validationData: [testData.xs, testData.ys],
      callbacks: {
        onEpochEnd: async (epoch, logs) => {
          updateHistory(epoch, logs as tf.Logs);
        },
        onTrainEnd: async () => {
          setTraining(false);
        },
      },
    });
  };

  return (
    <div className="space-y-4 border bg-white p-4">
      <h2 className="text-lg font-semibold">Entraînement du modèle</h2>
      <div className="grid grid-cols-2 gap-4">
        <label className="text-sm">
          Learning rate
          <input
            type="number"
            step="0.001"
            min="0.001"
            value={learningRate}
            onChange={(e) => setLearningRate(parseFloat(e.target.value))}
            className="mt-1 block w-full rounded border p-1 text-sm"
          />
        </label>
        <label className="text-sm">
          Epochs
          <input
            type="number"
            min="1"
            value={epochs}
            onChange={(e) => setEpochs(parseInt(e.target.value))}
            className="mt-1 block w-full rounded border p-1 text-sm"
          />
        </label>
        <label className="text-sm">
          Batch size
          <input
            type="number"
            min="1"
            value={batchSize}
            onChange={(e) => setBatchSize(parseInt(e.target.value))}
            className="mt-1 block w-full rounded border p-1 text-sm"
          />
        </label>
      </div>
      <button
        onClick={startTraining}
        disabled={training}
        className="mt-2 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
      >
        {training ? "Entraînement en cours..." : "Lancer l'entraînement"}
      </button>
      <button
        onClick={reinitializeModel}
        disabled={training}
        className="mt-2 ml-2 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
      >
        Réinitialiser le modèle
      </button>
    </div>
  );
};
