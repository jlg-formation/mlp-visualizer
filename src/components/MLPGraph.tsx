import React, { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { useMLPStore } from "../stores/useMLPStore";

const DEAD_THRESHOLD = 1e-6;

export const MLPGraph: React.FC = () => {
  const hiddenLayers = useMLPStore((s) => s.layers);
  const model = useMLPStore((s) => s.model);
  const pixels = useMLPStore((s) => s.pixels);
  const layers = [64, ...hiddenLayers, 10];
  const [orientation, setOrientation] = useState<"vertical" | "horizontal">(
    "vertical",
  );
  const [activations, setActivations] = useState<number[][]>([]);
  const [weights, setWeights] = useState<number[][][]>([]);
  const [maxWeight, setMaxWeight] = useState(1);
  const [showWeights, setShowWeights] = useState(false);
  const [maxActivations, setMaxActivations] = useState<number[][]>([]);
  const [showDead, setShowDead] = useState(false);

  const trainData = useMLPStore((s) => s.trainData);
  const historyLength = useMLPStore((s) => s.trainingHistory.epochs.length);

  const width = orientation === "vertical" ? layers.length * 120 + 200 : 600;
  const height = orientation === "vertical" ? 400 : layers.length * 120 + 200;

  useEffect(() => {
    if (!model || pixels.length !== 64) {
      setActivations([]);
      return;
    }
    const acts: number[][] = [];
    tf.tidy(() => {
      let tensor: tf.Tensor = tf.tensor2d([pixels], [1, 64]);
      acts.push(pixels);
      for (const layer of model.layers) {
        tensor = layer.apply(tensor) as tf.Tensor;
        acts.push(Array.from(tensor.dataSync()));
      }
    });
    setActivations(acts);
  }, [model, pixels]);

  useEffect(() => {
    if (!model) {
      setWeights([]);
      setMaxWeight(1);
      return;
    }
    const ws: number[][][] = [];
    tf.tidy(() => {
      for (const layer of model.layers) {
        const kernel = layer.getWeights()[0];
        if (!kernel) {
          ws.push([]);
          continue;
        }
        ws.push(kernel.arraySync() as number[][]);
      }
    });
    const maxW = Math.max(0.000001, ...ws.flat(2).map((v) => Math.abs(v)));
    setMaxWeight(maxW);
    setWeights(ws);
  }, [model]);

  useEffect(() => {
    if (!model || !trainData) {
      setMaxActivations([]);
      return;
    }
    const acts: number[][] = [];
    tf.tidy(() => {
      let tensor: tf.Tensor = trainData.xs;
      acts.push(Array.from(tensor.max(0).dataSync()));
      for (const layer of model.layers) {
        tensor = layer.apply(tensor) as tf.Tensor;
        acts.push(Array.from(tensor.max(0).dataSync()));
      }
    });
    setMaxActivations(acts);
  }, [model, trainData, historyLength]);

  const neuronPositions = layers.map((count, layerIndex) =>
    Array.from({ length: count }).map((_, i) => {
      const x =
        orientation === "vertical"
          ? 100 + layerIndex * 120
          : count > 1
            ? 50 + (i * (width - 100)) / (count - 1)
            : width / 2;
      const y =
        orientation === "vertical"
          ? count > 1
            ? 50 + (i * (height - 100)) / (count - 1)
            : height / 2
          : 100 + layerIndex * 120;
      return { x, y };
    }),
  );

  return (
    <div className="flex w-full flex-col gap-2 bg-white">
      <div className="flex p-2">
        <div className="inline-flex rounded border">
          <button
            onClick={() => setOrientation("vertical")}
            className={[
              "px-2 py-1 text-sm",
              orientation === "vertical"
                ? "bg-gray-600 text-white"
                : "bg-gray-200 text-gray-700",
              "rounded-l",
            ].join(" ")}
          >
            Vertical
          </button>
          <button
            onClick={() => setOrientation("horizontal")}
            className={[
              "px-2 py-1 text-sm",
              orientation === "horizontal"
                ? "bg-gray-600 text-white"
                : "bg-gray-200 text-gray-700",
              "rounded-r border-l",
            ].join(" ")}
          >
            Horizontal
          </button>
        </div>
        <div className="ml-2 inline-flex rounded border">
          <button
            onClick={() => setShowWeights((s) => !s)}
            className={[
              "px-2 py-1 text-sm",
              showWeights
                ? "bg-gray-600 text-white"
                : "bg-gray-200 text-gray-700",
              "rounded",
            ].join(" ")}
          >
            {showWeights ? "Hide weights" : "Show weights"}
          </button>
        </div>
        <div className="ml-2 inline-flex rounded border">
          <button
            onClick={() => setShowDead((s) => !s)}
            className={[
              "px-2 py-1 text-sm",
              showDead ? "bg-gray-600 text-white" : "bg-gray-200 text-gray-700",
              "rounded",
            ].join(" ")}
          >
            {showDead ? "Hide dead" : "Show dead"}
          </button>
        </div>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="flex-grow bg-white">
        {showWeights &&
          weights.map((matrix, layerIndex) => {
            const fromLayer = neuronPositions[layerIndex];
            const toLayer = neuronPositions[layerIndex + 1];
            if (!fromLayer || !toLayer) return null;
            return matrix.map((row, i) =>
              row.map((w, j) => {
                const thickness = (Math.abs(w) / maxWeight) * 3;
                if (thickness <= 0) return null;
                const from = fromLayer[i];
                const to = toLayer[j];
                if (!from || !to) return null;
                return (
                  <line
                    key={`w-${layerIndex}-${i}-${j}`}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="rgba(0,0,0,0.5)"
                    strokeWidth={thickness}
                  />
                );
              }),
            );
          })}
        {layers.map((count, layerIndex) =>
          Array.from({ length: count }).map((_, i) => {
            const { x, y } = neuronPositions[layerIndex][i];

            const v = activations[layerIndex]?.[i] ?? 0;
            const intensity = Math.max(0, Math.min(1, v));
            const isDead =
              showDead &&
              (maxActivations[layerIndex]?.[i] ?? 0) <= DEAD_THRESHOLD &&
              layerIndex > 0 &&
              layerIndex < layers.length - 1;
            const color = isDead
              ? "red"
              : `rgb(0, ${Math.round(intensity * 255)}, 0)`;

            return (
              <circle
                key={`${layerIndex}-${i}`}
                cx={x}
                cy={y}
                r="4"
                fill={color}
                stroke="gray"
                strokeWidth="1"
              />
            );
          }),
        )}
      </svg>
    </div>
  );
};
