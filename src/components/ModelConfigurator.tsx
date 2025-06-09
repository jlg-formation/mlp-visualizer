import React, { useState, useEffect } from "react";
import { useMLPStore } from "../stores/useMLPStore";

export const ModelConfigurator: React.FC = () => {
  const layers = useMLPStore((s) => s.layers);
  const setLayers = useMLPStore((s) => s.setLayers);
  const [localLayers, setLocalLayers] = useState<number[]>(layers);

  useEffect(() => {
    setLocalLayers(layers);
  }, [layers]);

  const updateLayer = (index: number, value: number) => {
    const updated = [...localLayers];
    updated[index] = value;
    setLocalLayers(updated);
    setLayers(updated);
  };

  const addLayer = () => {
    const updated = [...localLayers, 8];
    setLocalLayers(updated);
    setLayers(updated);
  };

  const removeLayer = (index: number) => {
    const updated = localLayers.filter((_, i) => i !== index);
    setLocalLayers(updated);
    setLayers(updated);
  };

  return (
    <div className="w-full max-w-sm space-y-3 border bg-white p-4">
      <h2 className="text-lg font-bold">Configuration du modèle</h2>
      {localLayers.map((size, i) => (
        <div key={i} className="flex items-center gap-2">
          <label className="text-sm">Couche {i + 1}</label>
          <input
            type="number"
            min="1"
            value={size}
            onChange={(e) => updateLayer(i, parseInt(e.target.value))}
            className="w-20 rounded border p-1 text-sm"
          />
          {localLayers.length > 1 && (
            <button
              onClick={() => removeLayer(i)}
              className="cursor-pointer text-sm text-red-500 hover:underline"
            >
              Supprimer
            </button>
          )}
        </div>
      ))}
      <button
        onClick={addLayer}
        className="mt-2 cursor-pointer rounded bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300"
      >
        + Ajouter une couche
      </button>
    </div>
  );
};
