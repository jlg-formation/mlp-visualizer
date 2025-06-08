import React, { useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import { useMLPStore } from "../stores/useMLPStore";

export const ModelStoragePanel: React.FC = () => {
  const model = useMLPStore((s) => s.model);
  const setModel = useMLPStore((s) => s.setModel);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const saveToLocalStorage = async () => {
    if (!model) return;
    await model.save("localstorage://mlp-model");
    alert("Modèle enregistré dans le navigateur.");
  };

  const loadFromLocalStorage = async () => {
    const m = await tf.loadLayersModel("localstorage://mlp-model");
    setModel(m);
    alert("Modèle chargé depuis le navigateur.");
  };

  const downloadModel = async () => {
    if (!model) return;
    await model.save("downloads://mlp-model");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const m = await tf.loadLayersModel(url);
      setModel(m);
      alert("Modèle chargé depuis fichier.");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-2 mt-6">
      <h2 className="text-lg font-bold">Sauvegarde / Chargement du modèle</h2>
      <button
        onClick={saveToLocalStorage}
        className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
      >
        💾 Sauvegarder (navigateur)
      </button>
      <button
        onClick={loadFromLocalStorage}
        className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
      >
        📥 Charger (navigateur)
      </button>
      <button
        onClick={downloadModel}
        className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
      >
        ⬇️ Télécharger le modèle
      </button>
      <div>
        <label className="block text-sm mt-2">
          📂 Charger depuis un fichier :
        </label>
        <input
          type="file"
          ref={fileInputRef}
          accept=".json"
          onChange={handleFileUpload}
          className="text-sm"
        />
      </div>
    </div>
  );
};
