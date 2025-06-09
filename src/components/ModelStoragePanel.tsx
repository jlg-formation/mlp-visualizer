import React from "react";
import * as tf from "@tensorflow/tfjs";
import JSZip from "jszip";
import { useMLPStore } from "../stores/useMLPStore";

export const ModelStoragePanel: React.FC = () => {
  const model = useMLPStore((s) => s.model);
  const setModel = useMLPStore((s) => s.setModel);
  const store = useMLPStore();

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
    const handler = tf.io.withSaveHandler(async (artifacts) => {
      const zip = new JSZip();
      const json = JSON.stringify({
        format: artifacts.format,
        generatedBy: artifacts.generatedBy,
        convertedBy: artifacts.convertedBy,
        modelTopology: artifacts.modelTopology,
        trainingConfig: artifacts.trainingConfig,
        weightsManifest: [
          {
            paths: ["weights.bin"],
            weights: artifacts.weightSpecs,
          },
        ],
      });

      zip.file("model.json", json);
      zip.file("weights.bin", artifacts.weightData! as ArrayBuffer);
      const blob = await zip.generateAsync({ type: "blob" });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "mlp-visualizer-model.zip";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      return {
        modelArtifactsInfo: {
          dateSaved: new Date(),
          modelTopologyType: "JSON",
          weightDataBytes: (artifacts.weightData! as ArrayBuffer).byteLength,
        },
      } as tf.io.SaveResult;
    });

    await model.save(handler);
  };

  const handleZipUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const zip = await JSZip.loadAsync(file);
    const jsonStr = await zip.file("model.json")!.async("string");
    const weights = await zip.file("weights.bin")!.async("arraybuffer");
    const jsonFile = new File([jsonStr], "model.json", {
      type: "application/json",
    });
    const weightsFile = new File([weights], "weights.bin");
    const m = await tf.loadLayersModel(
      tf.io.browserFiles([jsonFile, weightsFile]),
    );
    setModel(m);
    alert("Modèle chargé depuis zip.");
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-2 border bg-white p-4">
      <h2 className="text-lg font-bold">Modèle</h2>
      <button
        onClick={initNewDefaultModel}
        className="cursor-pointer rounded bg-gray-600 px-3 py-1 text-sm text-white hover:bg-gray-700"
      >
        Nouveau
      </button>
      <button
        onClick={saveToLocalStorage}
        className="cursor-pointer rounded bg-gray-600 px-3 py-1 text-sm text-white hover:bg-gray-700"
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
        className="cursor-pointer rounded bg-gray-600 px-3 py-1 text-sm text-white hover:bg-gray-700"
      >
        Export
      </button>

      <label className="flex cursor-pointer justify-center rounded bg-gray-600 px-3 py-1 text-sm text-white hover:bg-gray-700">
        <span className="w-full text-center">Import</span>
        <input
          type="file"
          accept=".zip"
          onChange={handleZipUpload}
          className="hidden"
        />
      </label>
    </div>
  );
};
