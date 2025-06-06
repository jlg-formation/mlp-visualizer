import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Legend,
  Tooltip
);

type Props = {
  history: {
    epochs: number[];
    loss: number[];
    valLoss: number[];
    accuracy: number[];
    valAccuracy: number[];
  };
};

export const TrainingChart: React.FC<Props> = ({ history }) => {
  const data = {
    labels: history.epochs,
    datasets: [
      {
        label: "Loss",
        data: history.loss,
        borderColor: "red",
        fill: false,
      },
      {
        label: "Val Loss",
        data: history.valLoss,
        borderColor: "orange",
        fill: false,
      },
      {
        label: "Accuracy",
        data: history.accuracy,
        borderColor: "green",
        fill: false,
      },
      {
        label: "Val Accuracy",
        data: history.valAccuracy,
        borderColor: "blue",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 1,
      },
    },
  };

  return (
    <div className="mt-6">
      <h2 className="text-md font-semibold mb-2">Courbes d'entraînement</h2>
      <Line data={data} options={options} />
    </div>
  );
};
