import type { StateCreator } from "zustand";
import type { Logs } from "@tensorflow/tfjs";
import type { TrainingSlice, TrainingHistory, MLPStore } from "./types";

export const emptyHistory = (): TrainingHistory => ({
  epochs: [],
  loss: [],
  valLoss: [],
  accuracy: [],
  valAccuracy: [],
});

export const createTrainingSlice: StateCreator<
  MLPStore,
  [],
  [],
  TrainingSlice
> = (set, _get, _store): TrainingSlice => {
  void _get;
  void _store;
  return {
    training: false,
    trainingHistory: emptyHistory(),
    setTraining: (v) => set({ training: v }),
    resetHistory: () => set({ trainingHistory: emptyHistory() }),
    updateHistory: (epoch, logs: Logs) =>
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
  };
};
