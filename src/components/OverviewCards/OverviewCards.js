  import React from "react";
  import "./OverviewCards.css";

  const cardData = [
    { title: "Total tests completed", value: "24 Tests", trend: "+12%", description: "on this week", image: require('../../assets/test_icon.png') },
    { title: "Average Score", value: "6.5", trend: "+18%", description: "on this week", image: require('../../assets/score_icon.png') },
    { title: "Hours spend", value: "20 Hours", trend: "-2%", description: "on this week", image: require('../../assets/alarm_icon.png') },
  ];
  

  const OverviewCards = () => {
    return (
      <div className="overview-cards">
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

  export default OverviewCards;
