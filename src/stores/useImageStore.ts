import { create } from "zustand";

export interface ImageData {
  pixels: number[];
  label: number;
}

interface ImageStore {
  trainImages: ImageData[];
  valImages: ImageData[];
  loadImages: () => Promise<void>;
}

export const useImageStore = create<ImageStore>((set) => {
  const store: ImageStore = {
    trainImages: [],
    valImages: [],
    loadImages: async () => {
      const res = await fetch("/digits_8x8.json");
      const data: ImageData[] = await res.json();
      const shuffled = data.sort(() => Math.random() - 0.5);
      const split = Math.floor(shuffled.length * 0.8);
      set({
        trainImages: shuffled.slice(0, split),
        valImages: shuffled.slice(split),
      });
    },
  };

  void store.loadImages();

  return store;
});
