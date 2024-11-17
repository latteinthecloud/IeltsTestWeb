import React, { useState } from "react";
import "./AdminUserTab.css";
import Pagination from "../Pagination/Pagination"

const UserTab = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage] = useState(1);
    const itemsPerPage = 10;

    const users = [
        { username: "Jane Cooper", userId: "Faker", email: "jane@microsoft.com", role: "Admin", lastLogin: "Today", status: "Active" },
        { username: "Floyd Miles", userId: "Klin", email: "floyd@yahoo.com", role: "User", lastLogin: "2 days ago", status: "Inactive" },
        { username: "Ronald Richards", userId: "Chovy", email: "ronald@adobe.com", role: "User", lastLogin: "1 day ago", status: "Inactive" },
        // Add more user data here...
    ];

    // Filtered and Paginated Data
    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );


    return (
        <div className="user-tab-container">
            <h2>All Users</h2>
            <div className="controls">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select className="sort-dropdown">
                    <option value="newest">Sort by: Newest</option>
                    <option value="lastLogin">Last Login</option>
                    <option value="status">Status</option>
                </select>
            </div>

            <table className="user-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>User ID</th>
                        <th>Email</th>
                        <th>Authority</th>
                        <th>Last Login</th>
                        <th>Status</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedUsers.map((user, index) => (
                        <tr key={index}>
                            <td>{user.username}</td>
                            <td>{user.userId}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.lastLogin}</td>
                            <td>
                                <span className={`status ${user.status.toLowerCase()}`}>
                                    {user.status}
                                </span>
                            </td>
                            <td>
                                <button className="edit-button">✏️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination />

        </div>
    );
};

export default UserTab;
