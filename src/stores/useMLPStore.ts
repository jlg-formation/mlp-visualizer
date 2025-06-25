import { create } from "zustand";
import { createDataSlice } from "./mlp/dataSlice";
import { createModelSlice } from "./mlp/modelSlice";
import { createTrainingSlice } from "./mlp/trainingSlice";
import type { MLPStore } from "./mlp/types";

export const useMLPStore = create<MLPStore>((set, get, store) => {
  const slices: MLPStore = {
    ...createDataSlice(set, get, store),
    ...createModelSlice(set, get, store),
    ...createTrainingSlice(set, get, store),
  };

  void slices.loadData();

  return slices;
});
