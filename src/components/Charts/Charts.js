import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./Charts.css";

// Register components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const chartData = {
  listening: [2, 4, 1, 5, 6, 8, 9, 3, 4],
  reading: [3, 5, 2, 6, 7, 8, 4, 3, 5],
};

const chartLabels = [
  "Under 4.0",
  "4.0",
  "4.5",
  "5.0",
  "5.5",
  "6.0",
  "6.5",
  "7.0",
  "7.5",
  "8.0",
  "8.5",
  "9.0",
];

const Charts = ({ chartDataKey, color }) => {
  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: "Scores",
        data: chartData[chartDataKey],
        backgroundColor: color,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-container">
      <Bar data={data} options={options} />
    </div>
  );
};

export default Charts;
