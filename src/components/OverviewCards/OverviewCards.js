import React from "react";
import "./OverviewCards.css"

const OverviewCards = ({ test = 0, score = 0, time = "00:00" }) => {
  const cardData = [
    { title: "Total tests taken", value: test, image: require('../../assets/test_icon.png') },
    { title: "Average Score", value: score, image: require('../../assets/score_icon.png') },
    { title: "Time spent", value: time, image: require('../../assets/alarm_icon.png') },
  ];

  return (
    <div className="overview-cards">
      {cardData.map((card, index) => (
        <div className="card" key={index}>
          <img src={card.image} alt={card.title} className="card-icon" />
          <h3>{card.title}</h3>
          <p className="value">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;
