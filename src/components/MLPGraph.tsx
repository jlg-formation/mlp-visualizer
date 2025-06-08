import React from "react";
import { useMLPStore } from "../stores/useMLPStore";

export const MLPGraph: React.FC = () => {
  const structure = useMLPStore((s) => s.structure);
  const layers = [64, ...structure];

  return (
    <svg viewBox="0 0 600 400" className="w-full h-96 bg-white">
      {layers.map((count, layerIndex) =>
        Array.from({ length: count }).map((_, i) => {
          const x = 100 + layerIndex * 120;
          const y = count > 1 ? 50 + (i * 300) / (count - 1) : 200;

          return (
            <circle
              key={`${layerIndex}-${i}`}
              cx={x}
              cy={y}
              r="10"
              fill="black"
              stroke="gray"
              strokeWidth="1"
            />
          );
        })
      )}
    </svg>
  );
};
