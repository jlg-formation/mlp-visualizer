import { ModelStoragePanel } from "../components/ModelStoragePanel";
import { ModelConfigurator } from "../components/ModelConfigurator";
import { MLPGraph } from "../components/MLPGraph";

export default function Model() {
  return (
    <div className="flex justify-center">
      <div className="flex w-full flex-wrap justify-between gap-4 p-4">
        <ModelStoragePanel />
        <ModelConfigurator />
        <MLPGraph />
      </div>
    </div>
  );
}
