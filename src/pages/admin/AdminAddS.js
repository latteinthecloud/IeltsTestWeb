import React from "react";
import SectionListen from "../../components/SectionListen/SectionListen";
import { useLocation } from "react-router-dom";

const AdminAddS = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const testId = params.get("testId");
  console.log(testId);
  return (
    <div>
      <SectionListen numberOfSections={3} />
    </div>
  );
};

export default AdminAddS;
