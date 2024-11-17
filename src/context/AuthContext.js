import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

// Predefined users
const USERS = [
  { username: "admin@admin", password: "admin", role: "admin" },
  { username: "user@user", password: "user", role: "user" },
];

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Tracks if the user is logged in
  const [user, setUser] = useState(null); // Stores the current user data

  /**
   * Logs in a user by validating credentials.
   * @param {string} username - The username entered.
   * @param {string} password - The password entered.
   * @returns {boolean} - Whether login was successful.
   */
  const login = (username, password) => {
    // Validate the provided credentials against predefined USERS
    const foundUser = USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      setIsAuthenticated(true);
      setUser(foundUser); // Save authenticated user data
      return true;
    } else {
      // Clear user and auth status if login fails
      setIsAuthenticated(false);
      setUser(null);
      return false; // Return false if authentication fails
    }
  };

  /**
   * Logs out the current user.
   */
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null); // Clear user data on logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to access AuthContext values.
 * @returns {object} - The context value with `isAuthenticated`, `user`, `login`, and `logout`.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  // Ensure context is used within an AuthProvider
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
