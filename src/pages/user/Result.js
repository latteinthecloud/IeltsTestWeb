import React, { useEffect, useState } from "react";
import RoundedButton from "../../components/RoundedButton/RoundedButton.tsx";
import { useAuth } from "../../context/AuthContext.js";
import resultApi from "../../api/resultApi.tsx";
import testApi from "../../api/testApi.js";

const Result = () => {
  const {user} = useAuth();
  const [data, setData] = useState([]);
  const [testDetails, setTestDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gọi cả hai API đồng thời
        const [response, testDetailsResult] = await Promise.all([
          resultApi.getAll(user.id).then((res) => {
            if (!Array.isArray(res)) {
              throw new Error("Invalid response format");
            }
            return res;
          }),
          resultApi.getAll(user.id).then(async (res) => {
            if (Array.isArray(res)) {
              return getAllTestDetails(res);
            }
            return [];
          }),
        ]);
  
        // Cập nhật state sau khi cả hai API hoàn thành
        setData(response); // Kết quả từ resultApi.getAll
        setTestDetails(testDetailsResult); // Kết quả từ getAllTestDetails
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [user]);

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
                Type
              </th>
              <th
                style={{
                  padding: "10px",
                  fontWeight: "bold",
                  borderBottom: "1px solid #ddd",
                }}
              >
                Skill
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
            {data.map((row, index) => (
              <tr key={index}>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  {formatDate(row.dateMake)}
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  {row.testAccess.charAt(0).toUpperCase() + row.testAccess.slice(1)}
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  {testDetails.at(index).type.charAt(0).toUpperCase() + testDetails.at(index).type.slice(1)}
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  {testDetails.at(index).skill.charAt(0).toUpperCase() + testDetails.at(index).skill.slice(1)}
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                {testDetails.at(index).skill.charAt(0).toUpperCase() + testDetails.at(index).skill.slice(1)}
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  {row.score}
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  {row.completeTime}
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

const formatDate = (dateString) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

async function getAllTestDetails(results) {
  try {
    const responses = await Promise.all(
      results.map(async (result) => {
        const testId = result.testId;
        try {
          const response = await testApi.getById(testId);
          // Tạo đối tượng với các thông tin cần thiết
          return {
            id: response.testId,
            type: response.testType,
            skill: response.testSkill,
            name: response.name,
          };
        } catch (error) {
          console.error("Error fetching test data:", error);
          // Trả về đối tượng lỗi nếu có
          return { testId, error: error.message };
        }
      })
    );
    return responses; // Trả về mảng các đối tượng
  } catch (error) {
    console.error("Error processing test details:", error);
    return []; // Trả về mảng rỗng nếu có lỗi
  }
}