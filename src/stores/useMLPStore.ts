import { create } from "zustand";
import * as tf from "@tensorflow/tfjs";
import { createModel } from "../lib/model";
import { extractLayerStructure } from "../lib/extractLayerStructure";

export interface TrainingHistory {
  epochs: number[];
  loss: number[];
  valLoss: number[];
  accuracy: number[];
  valAccuracy: number[];
}

interface MLPStore {
  model: tf.LayersModel | null;
  /** hidden layer sizes of the current model */
  layers: number[];
  pixels: number[];
  trainData: { xs: tf.Tensor; ys: tf.Tensor } | null;
  testData: { xs: tf.Tensor; ys: tf.Tensor } | null;
  training: boolean;
  trainingHistory: TrainingHistory;
  /** Load the digit dataset and prepare tensors */
  loadData: () => Promise<void>;
  setModel: (model: tf.LayersModel) => void;
  setLayers: (layers: number[]) => void;
  setPixels: (pixels: number[]) => void;
  setTrainData: (data: { xs: tf.Tensor; ys: tf.Tensor } | null) => void;
  setTestData: (data: { xs: tf.Tensor; ys: tf.Tensor } | null) => void;
  setTraining: (v: boolean) => void;
  /** Reinitialize weights and biases while keeping the same architecture */
  reinitializeModel: () => void;
  resetHistory: () => void;
  updateHistory: (epoch: number, logs: tf.Logs) => void;
  resetAll: () => void;
}

export const useMLPStore = create<MLPStore>((set, get) => {
  const emptyHistory = (): TrainingHistory => ({
    epochs: [],
    loss: [],
    valLoss: [],
    accuracy: [],
    valAccuracy: [],
  });

  const defaultLayers = [32, 16];
  const defaultModel = createModel(defaultLayers);
  defaultModel.predict(tf.zeros([1, 64]));

  const store: MLPStore = {
    model: defaultModel,
    layers: defaultLayers,
    pixels: [],
    trainData: null,
    testData: null,
    training: false,
    trainingHistory: emptyHistory(),
    loadData: async () => {
      const res = await fetch("./digits_8x8.json");
      const data: { pixels: number[]; label: number }[] = await res.json();

      const shuffled = data.sort(() => Math.random() - 0.5);
      const split = Math.floor(shuffled.length * 0.8);

      const oneHot = (label: number) =>
        Array.from({ length: 10 }, (_, i) => (i === label ? 1 : 0));

      const train = shuffled.slice(0, split);
      const test = shuffled.slice(split);

      set({
        trainData: {
          xs: tf.tensor2d(train.map((d) => d.pixels)),
          ys: tf.tensor2d(train.map((d) => oneHot(d.label))),
        },
        testData: {
          xs: tf.tensor2d(test.map((d) => d.pixels)),
          ys: tf.tensor2d(test.map((d) => oneHot(d.label))),
        },
      });
    },
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
    setPixels: (pixels) => set({ pixels }),
    setTrainData: (data) => set({ trainData: data }),
    setTestData: (data) => set({ testData: data }),
    setTraining: (v) => set({ training: v }),
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
    resetHistory: () => set({ trainingHistory: emptyHistory() }),
    updateHistory: (epoch, logs) =>
      set((state) => ({
        trainingHistory: {
          epochs: [...state.trainingHistory.epochs, epoch + 1],
          loss: [...state.trainingHistory.loss, logs.loss ?? 0],
          valLoss: [...state.trainingHistory.valLoss, logs.val_loss ?? 0],
          accuracy: [...state.trainingHistory.accuracy, logs.acc ?? 0],
          valAccuracy: [
            ...state.trainingHistory.valAccuracy,
            logs.val_acc ?? 0,
          ],
        },
      })),
    resetAll: () => {
      const defaultLayers = [32, 16];
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

  // automatically load the dataset
  void store.loadData();

  return store;
});
