import React from "react";
import RoundedButton from "../../components/RoundedButton/RoundedButton.tsx";

const Result = () => {
  // Dữ liệu mẫu
  const tableData = [
    {
      date: "12/02/2024",
      access: "Public",
      testName: "Mock test 1",
      score: 12,
      timeSpent: "00:30:00",
    },
    {
      date: "13/02/2024",
      access: "Private",
      testName: "Mock test 2",
      score: 15,
      timeSpent: "00:45:00",
    },
    // Thêm dữ liệu khác nếu cần
  ];
  return (
    <div className="main-content">
      <h2
        style={{ fontWeight: "bold", color: "rgb(41, 69, 99)", marginBottom: "20px" }}
      >
        Record
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center", // Căn giữa hàng
          alignItems: "flex-end", // Căn giữa theo chiều dọc
          gap: "40px", // Khoảng cách giữa các phần tử
          marginBottom: "20px", // Khoảng cách phía dưới hàng
        }}
      >
        {/* Bộ lọc Access */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <label
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            Access
          </label>
          <select
            style={{
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "14px",
            }}
          >
            <option value="all">All</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        {/* Bộ lọc Skill */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <label
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            Skill
          </label>
          <select
            style={{
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "14px",
            }}
          >
            <option value="all">All</option>
            <option value="reading">Reading</option>
            <option value="listening">Listening</option>
          </select>
        </div>

        {/* Bộ lọc Type */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <label
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            Type
          </label>
          <select
            style={{
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "14px",
            }}
          >
            <option value="all">All</option>
            <option value="academic">Academic</option>
            <option value="general">General</option>
          </select>
        </div>

        {/* Nút Apply */}
        <RoundedButton
          title="Apply"
          colors={["#294563","#080D30"]}
          onClick={()=>{}}>
        </RoundedButton>
      </div>

      {/*  table */}

      <div style={{ marginTop: "20px" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  padding: "10px",
                  fontWeight: "bold",
                  borderBottom: "1px solid #ddd",
                }}
              >
                Date
              </th>
              <th
                style={{
                  padding: "10px",
                  fontWeight: "bold",
                  borderBottom: "1px solid #ddd",
                }}
              >
                Access
              </th>
              <th
                style={{
                  padding: "10px",
                  fontWeight: "bold",
                  borderBottom: "1px solid #ddd",
                }}
              >
                Test name
              </th>
              <th
                style={{
                  padding: "10px",
                  fontWeight: "bold",
                  borderBottom: "1px solid #ddd",
                }}
              >
                Score
              </th>
              <th
                style={{
                  padding: "10px",
                  fontWeight: "bold",
                  borderBottom: "1px solid #ddd",
                }}
              >
                Time spent
              </th>
              <th
                style={{
                  padding: "10px",
                  fontWeight: "bold",
                  borderBottom: "1px solid #ddd",
                }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  {row.date}
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  {row.access}
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  {row.testName}
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  {row.score}
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  {row.timeSpent}
                </td>
                <td
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #ddd",
                    textAlign: "justify",
                  }}
                >
                  <RoundedButton
                    title="Review"
                    onClick={()=>{}}>
                  </RoundedButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Result;
