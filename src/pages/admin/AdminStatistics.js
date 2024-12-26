import React, {useState, useEffect}from "react";
import AdminStatisticsTab from "../../components/AdminStatisticsTab/AdminStatisticsTab";
import StatisticHeader from "../../components/StatisticHeader/StatisticHeader";
import statisticApi from "../../api/statisticApi.tsx";

const AdminStatistics = () => {
  const [activeFilter, setActiveFilter] = useState("week");
  const [user, setUser] = useState(0);
  const [test, setTest] = useState(0);
  const [taken, setTaken] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await statisticApi.getUser();
        const testResponse = await statisticApi.getTest();
        const takenResponse = await statisticApi.getTaken(activeFilter);
        
        setUser(userResponse.userCount);
        setTest(testResponse.testCount);
        setTaken(takenResponse.numberTestTaken);
      } catch (error) {
        console.error("Error fetching avatar:", error);
      }
    };

    fetchData();
  }, [activeFilter]);

  return (
    <div style={{width: "60%"}}>
      <h2 style={{fontSize: "22px", color: "rgb(41, 69, 99)", padding: "20px"}}>Statistic</h2>
      <StatisticHeader activeFilter={activeFilter} setActiveFilter={setActiveFilter}/>
      <AdminStatisticsTab user={user} test={test} taken={taken}/>
    </div>
  );
};

export default AdminStatistics;
