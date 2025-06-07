import React from "react";

interface Props {
  layers: number[];
  activations?: number[][];
}

export const MLPGraph: React.FC<Props> = ({ layers, activations }) => {
  return (
    <svg viewBox="0 0 600 400" className="w-full h-96 bg-white">
      {layers.map((count, layerIndex) => {
        return Array.from({ length: count }).map((_, i) => {
          const x = 100 + layerIndex * 120;
          const y = count > 1 ? 50 + (i * 300) / (count - 1) : 200;
          const activation = activations?.[layerIndex]?.[i] ?? 0;
          const color = activation > 0.5 ? "green" : "black";

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
        });
      })}
    </svg>
  );
};
