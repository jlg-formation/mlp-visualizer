import * as tf from "@tensorflow/tfjs";

export function createModel(layers: number[] = [32, 16]) {
  const model = tf.sequential();

  model.add(
    tf.layers.dense({ inputShape: [64], units: layers[0], activation: "relu" })
  );
  if (layers.length > 1) {
    for (let i = 1; i < layers.length; i++) {
      model.add(tf.layers.dense({ units: layers[i], activation: "relu" }));
    }
  }
  model.add(tf.layers.dense({ units: 10, activation: "softmax" }));

  model.compile({
    optimizer: tf.train.adam(),
    loss: "categoricalCrossentropy",
    metrics: ["accuracy"],
  });

  return model;
}
