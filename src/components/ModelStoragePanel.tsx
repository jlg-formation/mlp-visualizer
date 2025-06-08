import React, { useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import { useMLPStore } from "../stores/useMLPStore";

export const ModelStoragePanel: React.FC = () => {
  const model = useMLPStore((s) => s.model);
  const setModel = useMLPStore((s) => s.setModel);
  const store = useMLPStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initNewDefaultModel = async () => {
    console.log("nouveau modele");
    store.resetAll();
  };

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
    alert(
      "Attention! TensorflowJS sauve 2 fichiers (un .json pour la structure du modèle et un .bin pour ses poids d'entrainement). Il faut sauver les 2 fichiers",
    );
    await model.save("downloads://mlp-visualizer-model");
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
    <div className="flex flex-col gap-2 border bg-white p-4">
      <h2 className="text-lg font-bold">Modèle</h2>
      <button
        onClick={initNewDefaultModel}
        className="cursor-pointer rounded bg-gray-600 px-3 py-1 text-sm text-white hover:bg-gray-700"
      >
        Nouveau
      </button>
      <button
        onClick={saveToLocalStorage}
        className="cursor-pointer rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
      >
        Sauvegarde
      </button>
      <button
        onClick={loadFromLocalStorage}
        className="cursor-pointer rounded bg-gray-600 px-3 py-1 text-sm text-white hover:bg-gray-700"
      >
        Recharge
      </button>
      <button
        onClick={downloadModel}
        className="cursor-pointer rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
      >
        Export
      </button>
      <div>
        <label className="mt-2 block text-sm">
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
