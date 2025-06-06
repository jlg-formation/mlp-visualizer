import * as tf from "@tensorflow/tfjs";

export function extractLayerStructure(model: tf.LayersModel): number[] {
  return model.layers.map((layer) => {
    const shape = layer.outputShape;
    if (Array.isArray(shape)) {
      const size = Array.isArray(shape[1]) ? shape[1][0] : shape[1]; // [null, 32]
      return typeof size === "number" ? size : 0;
    }
    return 0;
  });
}
