import { TrainingChart } from "../components/TrainingChart";
import { TrainingPanel } from "../components/TrainingPanel";

export default function Training() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-4 p-4">
      <div className="w-full max-w-md">
        <TrainingPanel />
      </div>
      <div className="w-full max-w-2xl">
        <TrainingChart />
      </div>
    </div>
  );
}
