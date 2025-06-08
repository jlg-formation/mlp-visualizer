import { create } from "zustand";
import * as tf from "@tensorflow/tfjs";

export interface TrainingHistory {
  epochs: number[];
  loss: number[];
  valLoss: number[];
  accuracy: number[];
  valAccuracy: number[];
}

interface MLPStore {
  model: tf.LayersModel | null;
  layers: number[];
  /** layer sizes extracted from the current model */
  structure: number[];
  pixels: number[];
  trainData: { xs: tf.Tensor; ys: tf.Tensor } | null;
  testData: { xs: tf.Tensor; ys: tf.Tensor } | null;
  training: boolean;
  trainingHistory: TrainingHistory;
  setModel: (model: tf.LayersModel) => void;
  setLayers: (layers: number[]) => void;
  setStructure: (structure: number[]) => void;
  setPixels: (pixels: number[]) => void;
  setTrainData: (data: { xs: tf.Tensor; ys: tf.Tensor } | null) => void;
  setTestData: (data: { xs: tf.Tensor; ys: tf.Tensor } | null) => void;
  setTraining: (v: boolean) => void;
  resetHistory: () => void;
  updateHistory: (epoch: number, logs: tf.Logs) => void;
  resetAll: () => void;
}

export const useMLPStore = create<MLPStore>((set) => ({
  model: null,
  layers: [32, 16],
  structure: [],
  pixels: [],
  trainData: null,
  testData: null,
  training: false,
  trainingHistory: {
    epochs: [],
    loss: [],
    valLoss: [],
    accuracy: [],
    valAccuracy: [],
  },
  setModel: (model) => set({ model }),
  setLayers: (layers) => set({ layers }),
  setStructure: (structure) => set({ structure }),
  setPixels: (pixels) => set({ pixels }),
  setTrainData: (data) => set({ trainData: data }),
  setTestData: (data) => set({ testData: data }),
  setTraining: (v) => set({ training: v }),
  resetHistory: () =>
    set({
      trainingHistory: {
        epochs: [],
        loss: [],
        valLoss: [],
        accuracy: [],
        valAccuracy: [],
      },
    }),
  updateHistory: (epoch, logs) =>
    set((state) => ({
      trainingHistory: {
        epochs: [...state.trainingHistory.epochs, epoch + 1],
        loss: [...state.trainingHistory.loss, logs.loss ?? 0],
        valLoss: [...state.trainingHistory.valLoss, logs.val_loss ?? 0],
        accuracy: [...state.trainingHistory.accuracy, logs.acc ?? 0],
        valAccuracy: [...state.trainingHistory.valAccuracy, logs.val_acc ?? 0],
      },
    })),
  resetAll: () =>
    set({
      model: null,
      layers: [32, 16],
      structure: [],
      pixels: [],
      training: false,
      trainingHistory: {
        epochs: [],
        loss: [],
        valLoss: [],
        accuracy: [],
        valAccuracy: [],
      },
    }),
}));
