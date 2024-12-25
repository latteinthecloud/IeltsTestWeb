import React from "react";
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

const cardData = [
    { title: "Total users", value: "24 ", image: require('../../assets/user_icon.png') },
    { title: "Total tests upload", value: "25", image: require('../../assets/score_icon.png') },
    { title: "Total tests taken", value: "20", image: require('../../assets/total_test.png') },
  ];

const StatisticsTab = () => {
    return (
        <div className="statistics-tab">
            <div className="overview-cards"></div>
                {cardData.map((card, index) => (
                <div className="card" key={index}>
                    <img src={card.image} alt={card.title} className="card-icon" />
                        <h3>{card.title}</h3>
                        <p className="value">{card.value}</p>
                        <p className="trend">{card.trend}</p>
                        <p className="description">{card.description}</p>
          </div>
        ))}
        </div>
    );
};

export default StatisticsTab;
