import React, { useState } from "react";
import { useMLPStore } from "../stores/useMLPStore";

export const MLPGraph: React.FC = () => {
  const structure = useMLPStore((s) => s.structure);
  const layers = [64, ...structure];
  const [orientation, setOrientation] = useState<"vertical" | "horizontal">(
    "vertical"
  );

  const width = orientation === "vertical" ? layers.length * 120 + 200 : 600;
  const height = orientation === "vertical" ? 400 : layers.length * 120 + 200;

  const toggle = () =>
    setOrientation((o) => (o === "vertical" ? "horizontal" : "vertical"));

  return (
    <div className="flex flex-col gap-2 bg-white">
      <div className="flex p-2">
        <button onClick={toggle} className="px-2 py-1 bg-gray-200 rounded">
          {orientation === "vertical" ? "Vue horizontale" : "Vue verticale"}
        </button>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="flex-grow  bg-white">
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
    </div>
  );
};
