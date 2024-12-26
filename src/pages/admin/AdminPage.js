import React from "react";
import { Outlet } from "react-router-dom";

const AdminPage = () => {
  return (
    <div>
      {/* Render the selected tab's content */}
      <div className="tab-content">
        <Outlet />
      </div>
    </div>
  );
};
export default AdminPage;