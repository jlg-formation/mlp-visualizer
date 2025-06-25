import type { StateCreator } from "zustand";
import * as tf from "@tensorflow/tfjs";
import type { DataSlice, MLPStore } from "./types";

export const createDataSlice: StateCreator<MLPStore, [], [], DataSlice> = (
  set,
  _get,
  _store,
) => {
  void _get;
  void _store;
  return {
    pixels: [],
    trainData: null,
    testData: null,
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
    setPixels: (pixels) => set({ pixels }),
    setTrainData: (data) => set({ trainData: data }),
    setTestData: (data) => set({ testData: data }),
  };
};
