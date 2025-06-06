import React, { useState } from "react";

type Props = {
  defaultLayers?: number[];
  onChange: (layers: number[]) => void;
};

export const ModelConfigurator: React.FC<Props> = ({
  defaultLayers = [32, 16],
  onChange,
}) => {
  const [layers, setLayers] = useState<number[]>(defaultLayers);

  const updateLayer = (index: number, value: number) => {
    const newLayers = [...layers];
    newLayers[index] = value;
    setLayers(newLayers);
    onChange(newLayers);
  };

  const addLayer = () => {
    const newLayers = [...layers, 8];
    setLayers(newLayers);
    onChange(newLayers);
  };

  const removeLayer = (index: number) => {
    const newLayers = layers.filter((_, i) => i !== index);
    setLayers(newLayers);
    onChange(newLayers);
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-3">
      <h2 className="text-lg font-bold">Configuration du modèle</h2>
      {layers.map((size, i) => (
        <div key={i} className="flex items-center gap-2">
          <label className="text-sm">Couche {i + 1}</label>
          <input
            type="number"
            min="1"
            value={size}
            onChange={(e) => updateLayer(i, parseInt(e.target.value))}
            className="w-20 border p-1 rounded text-sm"
          />
          {layers.length > 1 && (
            <button
              onClick={() => removeLayer(i)}
              className="text-red-500 text-sm hover:underline"
            >
              Supprimer
            </button>
          )}
        </div>
      ))}
      <button
        onClick={addLayer}
        className="mt-2 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
      >
        + Ajouter une couche
      </button>
    </div>
  );
};
