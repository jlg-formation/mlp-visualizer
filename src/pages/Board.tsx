import { CanvasInput } from "../components/CanvasInput";
import { ModelConfigurator } from "../components/ModelConfigurator";
import { ModelStoragePanel } from "../components/ModelStoragePanel";
import { PredictPanel } from "../components/PredictPanel";
import { TrainingChart } from "../components/TrainingChart";
import { TrainingPanel } from "../components/TrainingPanel";

const View = ({ name }: { name: string }) => (
  <div className="border p-2 text-center text-sm">{name}</div>
);

export default function Board() {
  return (
    <div className="h-[40em] flex flex-col">
      <div className="flex flex-1">
        {/* Left Column */}
        <div className="w-[20em] flex flex-col ">
          <ModelConfigurator />
          <ModelStoragePanel />
        </div>

        {/* Center Column */}
        <div className="flex-grow flex flex-col">
          <div className="flex justify-start">
            <CanvasInput />
            <div className="flex-grow h-full">
              <PredictPanel />
            </div>
          </div>
          <div className="flex-grow ">
            <View name="ModelView" />
          </div>
        </div>

        {/* Right Column */}
        <div className="w-[20em] flex flex-col">
          <TrainingPanel />
          <TrainingChart />
        </div>
      </div>
    </div>
  );
}
