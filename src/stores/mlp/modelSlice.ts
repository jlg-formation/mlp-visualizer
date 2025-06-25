import type { StateCreator } from "zustand";
import * as tf from "@tensorflow/tfjs";
import { createModel } from "../../lib/model";
import { extractLayerStructure } from "../../lib/extractLayerStructure";
import type { ModelSlice, MLPStore } from "./types";
import { emptyHistory } from "./trainingSlice";

const defaultLayers = [32, 16];
const defaultModel = createModel(defaultLayers);
defaultModel.predict(tf.zeros([1, 64]));

export const createModelSlice: StateCreator<MLPStore, [], [], ModelSlice> = (
  set,
  get,
  _store,
) => {
  void _store;
  return {
    model: defaultModel,
    layers: defaultLayers,
    setModel: (model) => {
      const structure = extractLayerStructure(model);
      set({ model, layers: structure.slice(0, -1) });
    },
    setLayers: (layers) => {
      const m = createModel(layers);
      m.predict(tf.zeros([1, 64]));
      set({
        layers,
        model: m,
        trainingHistory: emptyHistory(),
      });
    },
    reinitializeModel: () => {
      const layers = get().layers;
      const m = createModel(layers);
      m.predict(tf.zeros([1, 64]));
      set({
        model: m,
        training: false,
        trainingHistory: emptyHistory(),
      });
    },
    resetAll: () => {
      const m = createModel(defaultLayers);
      m.predict(tf.zeros([1, 64]));
      set({
        model: m,
        layers: defaultLayers,
        pixels: [],
        training: false,
        trainingHistory: emptyHistory(),
      });
    },
  };
};
