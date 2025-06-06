import { createModel } from "./lib/model";
import { useEffect, useState } from "react";
import { PredictPanel } from "./components/PredictPanel";
import { CanvasInput } from "./components/CanvasInput";
import * as tf from "@tensorflow/tfjs";

function App() {
  const [pixels, setPixels] = useState<number[]>([]);
  const [model, setModel] = useState<tf.LayersModel | null>(null);

  useEffect(() => {
    // Charger ou entraîner un modèle simple au démarrage
    const m = createModel();
    m.predict(tf.zeros([1, 64])); // warm-up
    setModel(m);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">MLP Visualizer</h1>
      <CanvasInput onDrawEnd={setPixels} />
      {model && pixels.length === 64 && (
        <PredictPanel model={model} input={pixels} />
      )}
    </div>
  );
}

export default App;
