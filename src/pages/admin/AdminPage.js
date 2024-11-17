// import React from "react";
// import { Bar, Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   BarElement,
//   LineElement,
//   PointElement, // Required for points in Line charts
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
//   Title,
// } from "chart.js";

// // Register all necessary components
// ChartJS.register(
//   BarElement,
//   LineElement,
//   PointElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
//   Title
// );

// const AdminDashboard = () => {
//   // Data for Audience Chart
//   const audienceData = {
//     labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//     datasets: [
//       {
//         label: "Visitors",
//         data: [50, 60, 55, 70, 90, 100, 120],
//         backgroundColor: "#6c5ce7",
//       },
//     ],
//   };

//   // Data for Behavior Chart
//   const behaviorData = {
//     labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//     datasets: [
//       {
//         label: "Total Visitors",
//         data: [70, 80, 75, 100, 120, 150, 180],
//         backgroundColor: "#6c5ce7",
//       },
//       {
//         label: "New Visitors",
//         data: [30, 50, 40, 60, 70, 100, 120],
//         backgroundColor: "#d63031",
//       },
//     ],
//   };

//   // Data for Average Hour Chart
//   const averageHourData = {
//     labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
//     datasets: [
//       {
//         label: "This Month",
//         data: [10, 30, 20, 50, 60, 80, 100],
//         borderColor: "#0984e3",
//         fill: false,
//       },
//       {
//         label: "Last Month",
//         data: [20, 40, 10, 30, 50, 70, 90],
//         borderColor: "#e17055",
//         fill: false,
//         borderDash: [5, 5],
//       },
//     ],
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Admin Dashboard</h2>

//       {/* Tabs */}
//       <div className="tabs" style={{ display: "flex", marginBottom: "20px" }}>
//         <button className="tab active" style={styles.tab}>
//           Statistic
//         </button>
//         <button className="tab" style={styles.tab}>
//           Test
//         </button>
//         <button className="tab" style={styles.tab}>
//           User
//         </button>
//       </div>

//       {/* Charts Section */}
//       <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px" }}>
//         <div style={{ width: "48%" }}>
//           <h3>Audience</h3>
//           <p>493 visitors</p>
//           <Bar data={audienceData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
//         </div>
//         <div style={{ width: "48%" }}>
//           <h3>Behavior</h3>
//           <Bar data={behaviorData} options={{ responsive: true }} />
//         </div>
//       </div>

//       <div>
//         <h3>Average Hour</h3>
//         <Line
//           data={averageHourData}
//           options={{
//             responsive: true,
//             plugins: {
//               legend: { position: "top" },
//               title: { display: true, text: "Average Hour Comparison" },
//             },
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// const styles = {
//   tab: {
//     flex: 1,
//     padding: "10px 20px",
//     marginRight: "10px",
//     border: "none",
//     borderRadius: "5px",
//     backgroundColor: "#f0f0f0",
//     cursor: "pointer",
//     fontWeight: "bold",
//   },
// };

// export default AdminDashboard;

import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./AdminPageLayout.css";

const AdminPageLayout = () => {
  return (
    <div className="admin-page">
      {/* Tabs Navigation */}
      <div className="tabs">
        <NavLink to="/admin/statistics" className="tab" activeClassName="active">
          Statistics
        </NavLink>
        <NavLink to="/admin/test" className="tab" activeClassName="active">
          Test
        </NavLink>
        <NavLink to="/admin/user" className="tab" activeClassName="active">
          User
        </NavLink>
      </div>

      {/* Render the selected tab's content */}
      <div className="tab-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPageLayout;
