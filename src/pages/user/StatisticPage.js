import React, { useEffect, useState } from "react";
import StatisticHeader from "../../components/StatisticHeader/StatisticHeader";
import OverviewCards from "../../components/OverviewCards/OverviewCards";
import Charts from "../../components/Charts/Charts";
import "../../styles/StatisticPage.css";
import { useAuth } from "../../context/AuthContext";
import statisticApi from "../../api/statisticApi.tsx";

const StatisticPage = () => {
  const [activeFilter, setActiveFilter] = useState("week");
  const [test, setTest] = useState(0);
  const [score, setScore] = useState(0.0);
  const [time, setTime] = useState("00:00:00");
  const [bandsMap, setBandMaps] = useState();
  const {user} = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const testResponse = await statisticApi.getCompletedTest(user.id, activeFilter);
        const scoreResponse = await statisticApi.getAvgScore(user.id, activeFilter);
        const timeResponse = await statisticApi.getTimeSpent(user.id,activeFilter);
        const bandsMapResponse = await statisticApi.getBandMap(user.id, activeFilter);
        
        setTest(testResponse.numberTestTaken);
        setScore(scoreResponse.avgBand);
        setTime(timeResponse.totalTime);
        setBandMaps(bandsMapResponse);
      } catch (error) {
        console.error("Error fetching avatar:", error);
      }
    };

    if (user?.id) fetchData();
  }, [user, activeFilter]);

  return (
    <div className="statistic-page">
      <h2>Statistic</h2>
      <StatisticHeader activeFilter={activeFilter} setActiveFilter={setActiveFilter}/>
      <h2 className="section-title">Overview</h2>
      <OverviewCards test={test} score={score} time={time} />
      <h2 className="section-title">Score distributed</h2>
      <Charts chartData={bandsMap} color="#4a90e2" />
      
    </div>
  );
};

export default StatisticPage;
