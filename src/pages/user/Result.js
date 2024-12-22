import React from "react";

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
        style={{ fontWeight: "bold", color: "#1E1E1E", marginBottom: "20px" }}
      >
        Record
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center", // Căn giữa hàng
          alignItems: "center", // Căn giữa theo chiều dọc
          gap: "20px", // Khoảng cách giữa các phần tử
          marginBottom: "20px", // Khoảng cách phía dưới hàng
        }}
      >
        {/* Bộ lọc Access */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
            alignItems: "center",
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
            alignItems: "center",
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
        <button
          style={{
            padding: "10px 20px",
            background: "linear-gradient(180deg, #001A72 0%, #1E1E1E 100%)",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
            transition: "background 0.3s ease",
            marginTop: "24px",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(180deg, #0026a2 0%, #2E2E2E 100%)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(180deg, #001A72 0%, #1E1E1E 100%)")
          }
        >
          Apply
        </button>
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
                  <button
                    style={{
                      padding: "8px 16px",
                      background:
                        "linear-gradient(180deg, #28a745 0%, #218838 100%)",
                      color: "#fff",
                      fontSize: "14px",
                      fontWeight: "bold",
                      border: "none",
                      borderRadius: "20px",
                      cursor: "pointer",
                      transition: "background 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#1c7430")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        "linear-gradient(180deg, #28a745 0%, #218838 100%)")
                    }
                  >
                    Review
                  </button>
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
