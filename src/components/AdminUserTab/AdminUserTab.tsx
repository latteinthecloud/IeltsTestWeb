import React, { useState, useEffect } from "react";
import accountApi from "../../api/accountApi.js"; // Import API quản lý tài khoản
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
  const [filterRole, setFilterRole] = useState<string>(""); // Giá trị filter theo role
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

  // Gọi fetchUsers khi component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Lọc dữ liệu dựa trên searchTerm và filterRole
  const filteredData = userData.filter((user) => {
    const matchesSearch = user.email
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRole =
      filterRole === ""
        ? true
        : (filterRole === "Admin" && user.roleId === 1) ||
          (filterRole === "Learner" && user.roleId === 2);

    return matchesSearch && matchesRole;
  });

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
      fetchUsers(); // Reload danh sách người dùng
    } catch (error) {
      console.error("Error deactivating user:", error);
    } finally {
      setLoading(false);
      setShowPopup(false); // Tắt popup
    }
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        color: "#333",
        width: "666px",
      }}
    >
      <h2 style={{ fontSize: "22px", marginBottom: "20px", color: "rgb(41, 69, 99)" }}>User</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          gap: "40px"
        }}
      >
        {/* Thanh Search */}
        <input
          type="text"
          style={{
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            fontSize: "14px",
            width: "100%",
          }}
          placeholder="Search by email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật searchTerm
        />

        {/* Thanh Filter */}
        <select
          style={{
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            fontSize: "14px",
            width: "100px",
          }}
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)} // Cập nhật filterRole
        >
          <option value="">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Learner">Learner</option>
        </select>
      </div>

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
                  Action
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
                      title="Deactivate"
                      colors={["#EB0004", "#650101"]}
                      onClick={() => handleEditClick(user)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            currentPage={currentPage}
            totalItems={filteredData.length}
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
             <div style={{ width: "100%", display:"flex", justifyContent: "flex-end"}}>
                <img 
                  src={require("../../assets/close.png")} 
                  alt="close-icon"
                  onClick={() => { setShowPopup(false)}}>
                </img>
              </div>
            <h3>Do you want to deactivate this user?</h3>
            <p>
              <strong>{selectedUser.email}</strong>
            </p>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <RoundedButton
                title="No"
                colors={["#95a5a6", "#7f8c8d"]}
                onClick={() => setShowPopup(false)}
              />
               <RoundedButton
                title="Yes"
                colors={["#e74c3c", "#c0392b"]}
                onClick={handleDeactiveUser}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserTab;