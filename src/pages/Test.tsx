import { CanvasInput } from "../components/CanvasInput";
import { PredictPanel } from "../components/PredictPanel";

export default function Test() {
  return (
    <div className="flex flex-col items-center space-y-4 overflow-x-hidden p-4">
      <CanvasInput />
      <div className="w-full max-w-xs">
        <PredictPanel />
      </div>
    </div>
  );
}
