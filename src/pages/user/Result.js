import React, { useEffect, useState } from "react";
import RoundedButton from "../../components/RoundedButton/RoundedButton.tsx";
import { useAuth } from "../../context/AuthContext.js";
import resultApi from "../../api/resultApi.tsx";
import testApi from "../../api/testApi.js";
import ResultReviewButton from "../../components/ResultReviewButton/ResultReviewButton.tsx";
import userTestApi from "../../api/userTestApi.tsx";

const Result = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [testDetails, setTestDetails] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedValues, setSelectedValues] = useState({
    access: "all",
    skill: "all",
    type: "all",
  });

  const handleSelectChange = (event) => {
    const { name, value } = event.target; // name là tên select, value là giá trị chọn
    setSelectedValues((prevState) => ({
      ...prevState, // Giữ nguyên các giá trị trước
      [name]: value, // Cập nhật giá trị của select tương ứng
    }));
  };

  const handleFilter = () => {
    const filtered = data.filter((item) => {
      const test = getTest(item.testId);
      return (
        (selectedValues.access === "all" ||
          item.testAccess === selectedValues.access) &&
        (selectedValues.skill === "all" ||
          test.skill === selectedValues.skill) &&
        (selectedValues.type === "all" || test.type === selectedValues.type)
      );
    });
    setFilteredData(filtered);
  };

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
        setFilteredData(response);
        setTestDetails(testDetailsResult); // Kết quả từ getAllTestDetails
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]);

  const getTest = (testId) => {
    const test = testDetails.find((test) => test.id === testId);
    return test;
  };

  return (
    <div className="main-content">
      <h2
        style={{
          fontWeight: "bold",
          color: "rgb(41, 69, 99)",
          marginBottom: "20px",
        }}
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
            name="access"
            style={{
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "14px",
            }}
            onChange={handleSelectChange}
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
            onChange={handleSelectChange}
          >
            Skill
          </label>
          <select
            name="skill"
            style={{
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "14px",
            }}
            onChange={handleSelectChange}
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
            name="type"
            style={{
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "14px",
            }}
            onChange={handleSelectChange}
          >
            <option value="all">All</option>
            <option value="academic">Academic</option>
            <option value="general">General</option>
          </select>
        </div>

        {/* Nút Apply */}
        <RoundedButton
          title="Apply"
          colors={["#294563", "#080D30"]}
          onClick={handleFilter}
        ></RoundedButton>
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
            {filteredData.map((row, index) => {
              const test = getTest(row.testId);
              return (
                <tr key={index}>
                  <td
                    style={{ padding: "10px", borderBottom: "1px solid #ddd" }}
                  >
                    {formatDate(row.dateMake)}
                  </td>
                  <td
                    style={{ padding: "10px", borderBottom: "1px solid #ddd" }}
                  >
                    {row.testAccess.charAt(0).toUpperCase() +
                      row.testAccess.slice(1)}
                  </td>
                  <td
                    style={{ padding: "10px", borderBottom: "1px solid #ddd" }}
                  >
                    {test
                      ? test.type.charAt(0).toUpperCase() + test.type.slice(1)
                      : "No Type"}
                  </td>
                  <td
                    style={{ padding: "10px", borderBottom: "1px solid #ddd" }}
                  >
                    {test
                      ? test.skill.charAt(0).toUpperCase() + test.skill.slice(1)
                      : "No Skill"}
                  </td>
                  <td
                    style={{ padding: "10px", borderBottom: "1px solid #ddd" }}
                  >
                    {test
                      ? test.name.charAt(0).toUpperCase() + test.name.slice(1)
                      : "No Name"}
                  </td>
                  <td
                    style={{ padding: "10px", borderBottom: "1px solid #ddd" }}
                  >
                    {row.score}
                  </td>
                  <td
                    style={{ padding: "10px", borderBottom: "1px solid #ddd" }}
                  >
                    {row.completeTime}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      borderBottom: "1px solid #ddd",
                      textAlign: "justify",
                    }}
                  >
                    <ResultReviewButton
                      resultId={row.resultId}
                      testId={row.testId}
                      skill={test.skill}
                      time={row.completeTime}
                      score={row.score}
                    ></ResultReviewButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Result;

const formatDate = (dateString) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

async function getAllTestDetails(results) {
  try {
    const responses = await Promise.all(
      results.map(async (result) => {
        const testId = result.testId;
        const testAccess = result.testAccess;
        try {
          const response =
            testAccess === "public"
              ? await testApi.getById(testId)
              : await userTestApi.getById(testId);
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
