import { ModelStoragePanel } from "../components/ModelStoragePanel";
import { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { useMLPStore } from "../stores/useMLPStore";
import { CanvasInput } from "../components/CanvasInput";
import { ModelConfigurator } from "../components/ModelConfigurator";
import { PredictPanel } from "../components/PredictPanel";
import { TrainingPanel } from "../components/TrainingPanel";
import { TrainingChart } from "../components/TrainingChart";
import { MLPGraph } from "../components/MLPGraph";
import { createModel } from "../lib/model";
import { extractLayerStructure } from "../lib/extractLayerStructure"; // à créer si souhaité

interface DigitSample {
  pixels: number[]; // 64 valeurs normalisées (0..1)
  label: number; // chiffre entre 0 et 9
}

export default function Playground() {
  const model = useMLPStore((s) => s.model);
  const setModel = useMLPStore((s) => s.setModel);
  const layers = useMLPStore((s) => s.layers);
  const training = useMLPStore((s) => s.training);
  const trainingHistory = useMLPStore((s) => s.trainingHistory);
  const resetHistory = useMLPStore((s) => s.resetHistory);
  const resetAll = useMLPStore((s) => s.resetAll);

  const [structure, setStructure] = useState<number[]>([]);

  const [trainData, setTrainData] = useState<{
    xs: tf.Tensor;
    ys: tf.Tensor;
  } | null>(null);
  const [testData, setTestData] = useState<{
    xs: tf.Tensor;
    ys: tf.Tensor;
  } | null>(null);

  // Charger les données (par ex depuis digits_8x8.json)
  useEffect(() => {
    fetch("/digits_8x8.json")
      .then((res) => res.json())
      .then((data: DigitSample[]) => {
        const shuffled = data.sort(() => Math.random() - 0.5);
        const split = Math.floor(shuffled.length * 0.8);

        const oneHot = (label: number) =>
          Array.from({ length: 10 }, (_, i) => (i === label ? 1 : 0));

        const train = shuffled.slice(0, split);
        const test = shuffled.slice(split);

        setTrainData({
          xs: tf.tensor2d(train.map((d) => d.pixels)),
          ys: tf.tensor2d(train.map((d) => oneHot(d.label))),
        });
        setTestData({
          xs: tf.tensor2d(test.map((d) => d.pixels)),
          ys: tf.tensor2d(test.map((d) => oneHot(d.label))),
        });
      });
  }, []);

  useEffect(() => {
    const m = createModel(layers);
    m.predict(tf.zeros([1, 64]));
    setModel(m);
    setStructure(extractLayerStructure(m));
    resetHistory();
  }, [layers, setModel, resetHistory]);

  const handleReset = () => {
    resetAll();
    const newModel = createModel([32, 16]);
    newModel.predict(tf.zeros([1, 64]));
    setModel(newModel);
    setStructure(extractLayerStructure(newModel));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">Playground</h1>

      <button
        onClick={handleReset}
        disabled={training}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
      >
        🔁 Réinitialiser le Playground
      </button>

      <ModelConfigurator />

      {model && (
        <>
          {structure.length > 0 && (
            <MLPGraph layers={[64, ...structure]} activations={undefined} />
          )}
          <ModelStoragePanel
            model={model}
            onLoad={(newModel) => setModel(newModel)}
          />
        </>
      )}
      {model && trainData && testData && (
        <TrainingPanel
          model={model}
          trainData={trainData}
          testData={testData}
        />
      )}
      {trainingHistory.epochs.length > 0 && (
        <TrainingChart history={trainingHistory} />
      )}

      <CanvasInput />
      <PredictPanel />
    </div>
  );
}
