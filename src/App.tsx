import { useState } from "react";
import { MLPGraph } from "./components/MLPGraph";

function App() {
  const [layers, setLayers] = useState([64, 32, 16, 10]);
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">MLP Visualizer</h1>
      <MLPGraph layers={layers} />
    </div>
  );
}

export default App;
