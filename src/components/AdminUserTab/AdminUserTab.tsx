import React, { useState, useEffect } from "react";
import accountApi from "../../api/accountApi"; // Import API quản lý tài khoản
import Pagination from "../Pagination/Pagination.js";
import RoundedButton from "../RoundedButton/RoundedButton.tsx"; // Import RoundedButton

interface User {
  accountId: number;
  email: string;
  roleId: number;
  avatarLink: string | null;
  goal: number;
  isActive: boolean;
}

function UserTab() {
  const [userData, setUserData] = useState<User[]>([]); // Dữ liệu người dùng
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false); // Trạng thái tải dữ liệu
  const [searchTerm, setSearchTerm] = useState<string>(""); // Từ khóa tìm kiếm
  const [showPopup, setShowPopup] = useState<boolean>(false); // Trạng thái hiển thị popup
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // Người dùng được chọn
  const itemsPerPage = 10;

  // Hàm fetch tất cả người dùng
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await accountApi.getAll(); // Gọi API lấy danh sách người dùng
      if (Array.isArray(response)) {
        setUserData(response as User[]);
      } else {
        console.error("Invalid response format:", response);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm tìm kiếm người dùng theo email
  const searchUsers = async (query: string) => {
    setLoading(true);
    try {
      const response = await accountApi.find(query); // Gọi API tìm kiếm
      if (Array.isArray(response)) {
        setUserData(response as User[]);
      } else {
        console.error("Invalid response format:", response);
      }
    } catch (error) {
      console.error("Error searching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Gọi fetchUsers hoặc searchUsers khi `searchTerm` thay đổi
  useEffect(() => {
    if (searchTerm.trim() === "") {
      fetchUsers(); // Nếu ô tìm kiếm trống, lấy tất cả người dùng
    } else {
      searchUsers(searchTerm); // Tìm kiếm theo từ khóa
    }
  }, [searchTerm]); // Theo dõi sự thay đổi của searchTerm

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user); // Lưu thông tin người dùng được chọn
    setShowPopup(true); // Hiển thị popup
  };

  const handleDeactiveUser = async () => {
    if (!selectedUser) return;
    setLoading(true);
    try {
      await accountApi.deactive(selectedUser.accountId); // Gọi API deactive
      alert("User has been deactivated successfully.");
      fetchUsers(); // Reload danh sách người dùng
    } catch (error) {
      console.error("Error deactivating user:", error);
    } finally {
      setLoading(false);
      setShowPopup(false); // Tắt popup
    }
  };

  const paginatedData = userData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        color: "#333",
      }}
    >
      <h2 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>User List</h2>
      <input
        type="text"
        style={{
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          fontSize: "14px",
          width: "300px",
        }}
        placeholder="Search by email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật searchTerm
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    borderBottom: "1px solid #ddd",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  ID
                </th>
                <th
                  style={{
                    borderBottom: "1px solid #ddd",
                    padding: "20px",
                    textAlign: "left",
                  }}
                >
                  Email
                </th>
                <th
                  style={{
                    borderBottom: "1px solid #ddd",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  Role
                </th>
                <th
                  style={{
                    borderBottom: "1px solid #ddd",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  Active
                </th>
                <th
                  style={{
                    borderBottom: "1px solid #ddd",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((user) => (
                <tr key={user.accountId}>
                  <td
                    style={{
                      borderBottom: "1px solid #ddd",
                      padding: "20px",
                    }}
                  >
                    {user.accountId}
                  </td>
                  <td
                    style={{
                      borderBottom: "1px solid #ddd",
                      padding: "10px",
                    }}
                  >
                    {user.email}
                  </td>
                  <td
                    style={{
                      borderBottom: "1px solid #ddd",
                      padding: "10px",
                    }}
                  >
                    {user.roleId === 1
                      ? "Admin"
                      : user.roleId === 2
                      ? "Learner"
                      : "Unknown"}
                  </td>

                  <td
                    style={{
                      borderBottom: "1px solid #ddd",
                      padding: "10px",
                    }}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </td>
                  <td
                    style={{
                      borderBottom: "1px solid #ddd",
                      padding: "10px",
                      textAlign: "center",
                    }}
                  >
                    <RoundedButton
                      title="Edit"
                      colors={["#3498db", "#2980b9"]}
                      onClick={() => handleEditClick(user)}
                      icon={<i className="fa-regular fa-pen-to-square"></i>}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            currentPage={currentPage}
            totalItems={userData.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {/* Popup */}
      {showPopup && selectedUser && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0,0,0,0.25)",
              width: "400px",
              textAlign: "center",
            }}
          >
            <h3>Do you want to deactivate this user?</h3>
            <p>
              <strong>{selectedUser.email}</strong>
            </p>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <RoundedButton
                title="Yes"
                colors={["#e74c3c", "#c0392b"]}
                onClick={handleDeactiveUser}
              />
              <RoundedButton
                title="No"
                colors={["#95a5a6", "#7f8c8d"]}
                onClick={() => setShowPopup(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserTab;
