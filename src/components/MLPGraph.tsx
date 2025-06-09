import React, { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { useMLPStore } from "../stores/useMLPStore";

export const MLPGraph: React.FC = () => {
  const hiddenLayers = useMLPStore((s) => s.layers);
  const model = useMLPStore((s) => s.model);
  const pixels = useMLPStore((s) => s.pixels);
  const layers = [64, ...hiddenLayers, 10];
  const [orientation, setOrientation] = useState<"vertical" | "horizontal">(
    "vertical",
  );
  const [activations, setActivations] = useState<number[][]>([]);

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

  return (
    <div className="flex flex-col gap-2 bg-white">
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
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="flex-grow bg-white">
        {layers.map((count, layerIndex) =>
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

            const v = activations[layerIndex]?.[i] ?? 0;
            const intensity = Math.max(0, Math.min(1, v));
            const color = `rgb(0, ${Math.round(intensity * 255)}, 0)`;

            return (
              <circle
                key={`${layerIndex}-${i}`}
                cx={x}
                cy={y}
                r="10"
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
