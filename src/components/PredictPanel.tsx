import React, { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { useMLPStore } from "../stores/useMLPStore";

export const PredictPanel: React.FC = () => {
  const model = useMLPStore((s) => s.model);
  const input = useMLPStore((s) => s.pixels);

  const [prediction, setPrediction] = useState<number | null>(null);
  const [probs, setProbs] = useState<number[] | null>(null);

  useEffect(() => {
    const runPrediction = async () => {
      if (!model || input.length !== 64) return;
      const inputTensor = tf.tensor2d([input], [1, 64]);
      const result = model.predict(inputTensor) as tf.Tensor;
      const probArray = Array.from(await result.data()) as number[];
      const predictedDigit = probArray.indexOf(Math.max(...probArray));

      setProbs(probArray);
      setPrediction(predictedDigit);
    };

    runPrediction();
  }, [input, model]);

  return (
    <div className="mt-4 p-4 border rounded bg-white shadow">
      <h2 className="text-lg font-semibold mb-2">Prédiction</h2>

      {prediction !== null && (
        <p className="text-2xl">
          Chiffre prédit :{" "}
          <span className="font-bold text-green-700">{prediction}</span>
        </p>
      )}

      {probs && (
        <div className="mt-4 grid grid-cols-5 gap-2">
          {probs.map((p, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-5">{i}</span>
              <div className="w-full h-3 bg-gray-200 rounded">
                <div
                  className="h-3 bg-green-500 rounded"
                  style={{ width: `${(p * 100).toFixed(1)}%` }}
                />
              </div>
              <span className="text-sm text-gray-500">
                {(p * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
