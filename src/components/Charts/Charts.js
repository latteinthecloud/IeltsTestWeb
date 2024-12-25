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

const chartLabels = [
  "1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9",
];

const Charts = ({ chartData, color }) => {
  // Nếu không có dữ liệu, sử dụng mảng giá trị mặc định là 0
  const dataValues = chartLabels.map((label) => (chartData ? chartData[label] || 0 : 0));

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: "Scores",
        data: dataValues,
        backgroundColor: color || "#4CAF50", // Màu mặc định nếu không có
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        min: 0, // Bắt đầu từ 0
        max: 10, // Kết thúc ở 10
        ticks: {
          stepSize: 1, // Khoảng cách giữa các giá trị
        },
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
