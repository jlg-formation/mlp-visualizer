import { ModelStoragePanel } from "../components/ModelStoragePanel";
import { useMLPStore } from "../stores/useMLPStore";
import { CanvasInput } from "../components/CanvasInput";
import { ModelConfigurator } from "../components/ModelConfigurator";
import { PredictPanel } from "../components/PredictPanel";
import { TrainingPanel } from "../components/TrainingPanel";
import { TrainingChart } from "../components/TrainingChart";
import { MLPGraph } from "../components/MLPGraph";

export default function Playground() {
  const model = useMLPStore((s) => s.model);
  const training = useMLPStore((s) => s.training);
  const trainingHistory = useMLPStore((s) => s.trainingHistory);
  const resetAll = useMLPStore((s) => s.resetAll);

  const structure = useMLPStore((s) => s.structure);

  const trainData = useMLPStore((s) => s.trainData);
  const testData = useMLPStore((s) => s.testData);

  const handleReset = () => {
    resetAll();
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
          {structure.length > 0 && <MLPGraph />}
          <ModelStoragePanel />
        </>
      )}
      {model && trainData && testData && <TrainingPanel />}
      {trainingHistory.epochs.length > 0 && <TrainingChart />}

      <CanvasInput />
      <PredictPanel />
    </div>
  );
}
