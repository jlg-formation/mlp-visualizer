import { CanvasInput } from "./components/CanvasInput";

const res = await fetch("/digits_8x8.json");
const digits = await res.json();
console.log("digits: ", digits);

function App() {
  const handleDraw = (pixels: number[]) => {
    console.log("Pixels 8x8 normalisés :", pixels);
    // TODO : feed to MLP model.predict(tf.tensor([pixels]))
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Dessine un chiffre</h1>
      <CanvasInput onDrawEnd={handleDraw} />
    </div>
  );
}

export default App;
