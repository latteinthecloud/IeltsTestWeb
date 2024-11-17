import React from "react";
import { Bar, Line } from "react-chartjs-2";
import "./AdminStatisticsTab.css";

import {
    Chart as ChartJS,
    BarElement,
    LineElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title,
    PointElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
    BarElement,
    LineElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title,
    PointElement
);

const StatisticsTab = () => {
    // Audience Chart Data
    const audienceData = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                label: "Visitors",
                data: [50, 60, 55, 70, 90, 100, 120],
                backgroundColor: "#6C5CE7",
            },
        ],
    };

    // Behavior Chart Data
    const behaviorData = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                label: "Total Visitors",
                data: [100, 120, 110, 150, 200, 250, 300],
                backgroundColor: "#6C5CE7",
            },
            {
                label: "New Visitors",
                data: [50, 70, 60, 80, 100, 120, 150],
                backgroundColor: "#D63031",
            },
        ],
    };

    // Average Hour Chart Data
    const averageHourData = {
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: [
            {
                label: "This Month",
                data: [10, 20, 15, 35, 50, 60, 75],
                borderColor: "#0984E3",
                borderWidth: 2,
                fill: false,
                pointBackgroundColor: "#0984E3",
            },
            {
                label: "Last Month",
                data: [15, 25, 20, 40, 55, 70, 90],
                borderColor: "#E17055",
                borderWidth: 2,
                fill: false,
                borderDash: [5, 5],
                pointBackgroundColor: "#E17055",
            },
        ],
    };

    return (
        <div className="statistics-tab">
            {/* Audience and Behavior Charts */}
            <div className="charts-container">
                <div className="chart-section">
                    <h3>Audience</h3>
                    <p>493 visitors</p>
                    <Bar data={audienceData} options={{ responsive: true }} />
                </div>

                <div className="chart-section">
                    <h3>Behavior</h3>
                    <Bar data={behaviorData} options={{ responsive: true }} />
                </div>
            </div>

            {/* Average Hour Chart */}
            <div className="average-hour-chart">
                <h3>Average Hour</h3>
                <Line
                    data={averageHourData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { position: "bottom" },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default StatisticsTab;
