import React from "react";
import { Link } from "react-router-dom";
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
import { useMLPStore } from "../stores/useMLPStore";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Legend,
  Tooltip,
);

export const TrainingChart: React.FC = () => {
  const history = useMLPStore((s) => s.trainingHistory);
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

  const lastIndex = history.epochs.length - 1;
  const lastLoss = lastIndex >= 0 ? history.loss[lastIndex].toFixed(4) : "-";
  const lastValLoss =
    lastIndex >= 0 ? history.valLoss[lastIndex].toFixed(4) : "-";
  const lastAcc = lastIndex >= 0 ? history.accuracy[lastIndex].toFixed(4) : "-";
  const lastValAcc =
    lastIndex >= 0 ? history.valAccuracy[lastIndex].toFixed(4) : "-";

  return (
    <div className="flex w-full flex-col border bg-white p-3">
      <h2 className="text-md mb-2 font-semibold">Courbes d'entraînement</h2>
      <Line data={data} options={options} />
      <div className="mt-2 space-y-1 text-sm">
        <div>
          <Link to="/doc#loss" className="text-blue-700 underline">
            loss
          </Link>
          : {lastLoss}
        </div>
        <div>
          <Link to="/doc#val_loss" className="text-blue-700 underline">
            val_loss
          </Link>
          : {lastValLoss}
        </div>
        <div>
          <Link to="/doc#accuracy" className="text-blue-700 underline">
            accuracy
          </Link>
          : {lastAcc}
        </div>
        <div>
          <Link to="/doc#val_accuracy" className="text-blue-700 underline">
            val_accuracy
          </Link>
          : {lastValAcc}
        </div>
        <div>
          <Link to="/doc#epoch" className="text-blue-700 underline">
            epochs
          </Link>
          : {history.epochs.length}
        </div>
      </div>
    </div>
  );
};
