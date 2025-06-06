import * as tf from "@tensorflow/tfjs";
import { useEffect, useState } from "react";
import { CanvasInput } from "../components/CanvasInput";
import { MLPGraph } from "../components/MLPGraph";
import { ModelConfigurator } from "../components/ModelConfigurator";
import { ModelStoragePanel } from "../components/ModelStoragePanel";
import { PredictPanel } from "../components/PredictPanel";
import { TrainingChart } from "../components/TrainingChart";
import { TrainingPanel } from "../components/TrainingPanel";
import { createModel } from "../lib/model";

interface DigitSample {
  pixels: number[]; // 64 valeurs normalisées (0..1)
  label: number; // chiffre entre 0 et 9
}

function extractLayerStructure(model: tf.LayersModel): number[] {
  return model.layers.map((layer) => {
    const shape = layer.outputShape;
    if (Array.isArray(shape)) {
      const size = Array.isArray(shape[1]) ? shape[1][0] : shape[1]; // [null, 32]
      return typeof size === "number" ? size : 0;
    }
    return 0;
  });
}

export default function Playground() {
  const [pixels, setPixels] = useState<number[]>([]);
  const [layers, setLayers] = useState<number[]>([32, 16]);
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [structure, setStructure] = useState<number[]>([]);
  const [trainData, setTrainData] = useState<{
    xs: tf.Tensor;
    ys: tf.Tensor;
  } | null>(null);
  const [testData, setTestData] = useState<{
    xs: tf.Tensor;
    ys: tf.Tensor;
  } | null>(null);

  const [trainingHistory, setTrainingHistory] = useState({
    epochs: [] as number[],
    loss: [] as number[],
    valLoss: [] as number[],
    accuracy: [] as number[],
    valAccuracy: [] as number[],
  });
  const [training, setTraining] = useState(false);

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
    const m = createModel(layers); // ex: [32, 16]
    m.predict(tf.zeros([1, 64])); // warm-up
    setModel(m);
    setStructure(extractLayerStructure(m));
  }, [layers]);

  const handleReset = () => {
    const newModel = createModel(layers);
    newModel.predict(tf.zeros([1, 64])); // warm-up

    setModel(newModel);
    setStructure(extractLayerStructure(newModel));
    setPixels([]);
    setTrainingHistory({
      epochs: [],
      loss: [],
      valLoss: [],
      accuracy: [],
      valAccuracy: [],
    });
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

      <ModelConfigurator defaultLayers={layers} onChange={setLayers} />
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
          onEpochEnd={(epoch, logs) => {
            setTrainingHistory((prev) => ({
              epochs: [...prev.epochs, epoch + 1],
              loss: [...prev.loss, logs.loss ?? 0],
              valLoss: [...prev.valLoss, logs.val_loss ?? 0],
              accuracy: [...prev.accuracy, logs.acc ?? 0],
              valAccuracy: [...prev.valAccuracy, logs.val_acc ?? 0],
            }));
          }}
          setTraining={setTraining}
        />
      )}
      {trainingHistory.epochs.length > 0 && (
        <TrainingChart history={trainingHistory} />
      )}

      <CanvasInput onDrawEnd={setPixels} />
      {model && pixels.length === 64 && (
        <PredictPanel model={model} input={pixels} />
      )}
    </div>
  );
}
