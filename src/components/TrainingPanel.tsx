import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";

type Props = {
  model: tf.LayersModel;
  trainData: { xs: tf.Tensor; ys: tf.Tensor };
  testData: { xs: tf.Tensor; ys: tf.Tensor };
  onTrainEnd?: () => void;
  onEpochEnd?: (epoch: number, logs: tf.Logs) => void;
};

export const TrainingPanel: React.FC<Props> = ({
  model,
  trainData,
  testData,
  onTrainEnd,
  onEpochEnd,
}) => {
  const [learningRate, setLearningRate] = useState(0.01);
  const [epochs, setEpochs] = useState(10);
  const [batchSize, setBatchSize] = useState(32);
  const [training, setTraining] = useState(false);

  const startTraining = async () => {
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
          onEpochEnd?.(epoch, logs as tf.Logs);
        },
        onTrainEnd: async () => {
          setTraining(false);
          onTrainEnd?.();
        },
      },
    });
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-4 mt-4">
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
            className="block w-full border rounded p-1 text-sm mt-1"
          />
        </label>
        <label className="text-sm">
          Epochs
          <input
            type="number"
            min="1"
            value={epochs}
            onChange={(e) => setEpochs(parseInt(e.target.value))}
            className="block w-full border rounded p-1 text-sm mt-1"
          />
        </label>
        <label className="text-sm">
          Batch size
          <input
            type="number"
            min="1"
            value={batchSize}
            onChange={(e) => setBatchSize(parseInt(e.target.value))}
            className="block w-full border rounded p-1 text-sm mt-1"
          />
        </label>
      </div>
      <button
        onClick={startTraining}
        disabled={training}
        className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
      >
        {training ? "Entraînement en cours..." : "Lancer l'entraînement"}
      </button>
    </div>
  );
};
