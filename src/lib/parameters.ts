export interface LayerParameters {
  inputs: number;
  outputs: number;
  weights: number;
  biases: number;
  subtotal: number;
}

export interface ParameterStats {
  layers: LayerParameters[];
  totalWeights: number;
  totalBiases: number;
  total: number;
  memoryKiB: number;
}

const BYTES_PER_PARAMETER = 4; // float32

export function computeParameterStats(layers: number[]): ParameterStats {
  const details: LayerParameters[] = layers.slice(1).map((outputs, i) => {
    const inputs = layers[i];
    const weights = inputs * outputs;
    const biases = outputs;
    return { inputs, outputs, weights, biases, subtotal: weights + biases };
  });

  const totalWeights = details.reduce((sum, l) => sum + l.weights, 0);
  const totalBiases = details.reduce((sum, l) => sum + l.biases, 0);
  const total = totalWeights + totalBiases;

  return {
    layers: details,
    totalWeights,
    totalBiases,
    total,
    memoryKiB: (total * BYTES_PER_PARAMETER) / 1024,
  };
}

export function formatNumber(value: number): string {
  return Number.isFinite(value) ? value.toLocaleString("fr-FR") : "—";
}

export function formatKiB(value: number): string {
  return Number.isFinite(value)
    ? `${value.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} KiB`
    : "—";
}
