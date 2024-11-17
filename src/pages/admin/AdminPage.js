import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const AdminPage = () => {
  return (
    <div>
      {/* Tabs Navigation */}
      <div className="tabs">
        <NavLink style={{ textDecoration: 'none' }}
          to="/statistics"
          className={({ isActive }) => (isActive ? "tab active" : "tab")}
        >
          <span className="tab-icon">💬</span> Statistics
        </NavLink>
        <NavLink style={{ textDecoration: 'none' }}
          to="/test"
          className={({ isActive }) => (isActive ? "tab active" : "tab")}
        >
          <span className="tab-icon">📋</span> Test
        </NavLink>
        <NavLink style={{ textDecoration: 'none' }}
          to="/user"
          className={({ isActive }) => (isActive ? "tab active" : "tab")}
        >
          <span className="tab-icon">👤</span> User
        </NavLink>
      </div>

      {/* Render the selected tab's content */}
      <div className="tab-content">
        <Outlet />
      </div>
    </div>
  );
};
export default AdminPage;
