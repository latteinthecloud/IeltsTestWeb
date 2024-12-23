import React from "react";
import AdminStatisticsTab from "../../components/AdminStatisticsTab/AdminStatisticsTab";
import StatisticHeader from "../../components/StatisticHeader/StatisticHeader";

const AdminStatistics = () => {
  return (
    <div>
      <StatisticHeader />
      <AdminStatisticsTab />
    </div>
  );
};

export default AdminStatistics;
