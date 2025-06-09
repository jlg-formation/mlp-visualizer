import React, { useState } from "react";
import { Link } from "react-router-dom";
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
        onBatchEnd: async () => {
          // Yield to the browser so UI updates like the spinner stay smooth.
          await tf.nextFrame();
        },
        onEpochEnd: async (epoch, logs) => {
          updateHistory(epoch, logs as tf.Logs);
          // Yield after each epoch as well.
          await tf.nextFrame();
        },
        onTrainEnd: async () => {
          setTraining(false);
        },
      },
    });
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-2 border bg-white p-4">
      <h2 className="text-lg font-semibold">Entraînement du modèle</h2>
      <div className="grid grid-cols-2 gap-4">
        <label className="text-sm">
          <Link to="/doc#learning_rate" className="text-blue-700 underline">
            Learning rate
          </Link>
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
          <Link to="/doc#epoch" className="text-blue-700 underline">
            Epochs
          </Link>
          <input
            type="number"
            min="1"
            value={epochs}
            onChange={(e) => setEpochs(parseInt(e.target.value))}
            className="mt-1 block w-full rounded border p-1 text-sm"
          />
        </label>
        <label className="text-sm">
          <Link to="/doc#batch_size" className="text-blue-700 underline">
            Batch size
          </Link>
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
        className="mt-2 cursor-pointer rounded bg-green-600 px-4 py-1 text-white hover:bg-green-700 disabled:opacity-50"
      >
        {training ? (
          <span className="flex items-center justify-center gap-1">
            Entraînement en cours
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4z"
              />
            </svg>
          </span>
        ) : (
          "Lancer l'entraînement"
        )}
      </button>
      <button
        onClick={reinitializeModel}
        disabled={training}
        className="cursor-pointer rounded border border-red-500 px-4 py-1 text-red-500 hover:text-red-600 active:bg-red-100"
      >
        Réinitialiser le modèle
      </button>
    </div>
  );
};
