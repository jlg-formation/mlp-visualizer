import { CanvasInput } from "../components/CanvasInput";
import { PredictPanel } from "../components/PredictPanel";

export default function Test() {
  return (
    <div className="flex flex-wrap gap-2 overflow-x-hidden p-4">
      <CanvasInput />
      <div className="flex-grow">
        <PredictPanel />
      </div>
    </div>
  );
}
