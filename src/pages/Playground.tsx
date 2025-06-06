import { ModelConfigurator } from "../components/ModelConfigurator";
import { CanvasInput } from "../components/CanvasInput";
import { PredictPanel } from "../components/PredictPanel";
import { createModel } from "../lib/model";
import { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

export default function Playground() {
  const [pixels, setPixels] = useState<number[]>([]);
  const [layers, setLayers] = useState<number[]>([32, 16]);
  const [model, setModel] = useState<tf.LayersModel | null>(null);

  useEffect(() => {
    const m = createModel(layers);
    m.predict(tf.zeros([1, 64]));
    setModel(m);
  }, [layers]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">Playground</h1>
      <ModelConfigurator defaultLayers={layers} onChange={setLayers} />
      <CanvasInput onDrawEnd={setPixels} />
      {model && pixels.length === 64 && (
        <PredictPanel model={model} input={pixels} />
      )}
    </div>
  );
}
