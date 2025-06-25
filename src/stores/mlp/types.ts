import * as tf from "@tensorflow/tfjs";

export interface TrainingHistory {
  epochs: number[];
  loss: number[];
  valLoss: number[];
  accuracy: number[];
  valAccuracy: number[];
}

export interface DataSlice {
  pixels: number[];
  trainData: { xs: tf.Tensor; ys: tf.Tensor } | null;
  testData: { xs: tf.Tensor; ys: tf.Tensor } | null;
  loadData: () => Promise<void>;
  setPixels: (pixels: number[]) => void;
  setTrainData: (data: { xs: tf.Tensor; ys: tf.Tensor } | null) => void;
  setTestData: (data: { xs: tf.Tensor; ys: tf.Tensor } | null) => void;
}

export interface ModelSlice {
  model: tf.LayersModel | null;
  /** hidden layer sizes of the current model */
  layers: number[];
  setModel: (model: tf.LayersModel) => void;
  setLayers: (layers: number[]) => void;
  reinitializeModel: () => void;
  resetAll: () => void;
}

export interface TrainingSlice {
  training: boolean;
  trainingHistory: TrainingHistory;
  setTraining: (v: boolean) => void;
  resetHistory: () => void;
  updateHistory: (epoch: number, logs: tf.Logs) => void;
}

export type MLPStore = DataSlice & ModelSlice & TrainingSlice;
