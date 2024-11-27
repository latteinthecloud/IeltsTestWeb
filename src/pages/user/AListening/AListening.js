import React from 'react';
import TestTabs from "../../../components/TestTabs/TestTabs";
import FilterBar from "../../user/AListening/components/FilterBar/FilterBar"
import TestGroups from "../AListening/components/TestGroups/TestGroups";
import "../AListening/AListening.css"

const AListening = () => {
  return (
    
    <div className="main-content">
      <h2>IELTS Listening Tests</h2>
      <TestTabs />
      <FilterBar />
      <TestGroups />
    </div>
  );
};

export default AListening;
