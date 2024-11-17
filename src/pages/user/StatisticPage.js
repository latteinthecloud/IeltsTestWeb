import React from "react";
import StatisticHeader from "../../components/StatisticHeader/StatisticHeader";
import OverviewCards from "../../components/OverviewCards/OverviewCards";
import Charts from "../../components/Charts/Charts";
import "../../styles/StatisticPage.css";

const StatisticPage = () => {
  return (
    <div className="statistic-page">
      <StatisticHeader />
      <h2 className="section-title">Overview</h2>
      <OverviewCards />
      <h2 className="section-title">Listening</h2>
      <Charts chartDataKey="listening" color="#4a90e2" />
      <h2 className="section-title">Reading</h2>
      <Charts chartDataKey="reading" color="#4caf50" />
    </div>
  );
};

export default StatisticPage;
