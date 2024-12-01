import { jwtDecode } from "jwt-decode";
import React, { createContext, useState, useContext } from "react";
import authenApi from "../api/authenApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Tracks if the user is logged in
  const [user, setUser] = useState(null); // Stores the current user data

  /**
   * Logs in a user by validating credentials.
   * @param {string} email - The email entered.
   * @param {string} password - The password entered.
   * @returns {boolean} - Whether login was successful.
   */
  const login = async (email, password) => {
    try {
      const loginResponse = await authenApi.login(email, password);
      const decoded = jwtDecode(loginResponse); // Decode the JWT token
      console.log(decoded);

      const foundUser = {
        email: decoded.sub, // Store the email from the JWT token
        role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"], // Store role
      };
      console.log(foundUser);
      if (foundUser) {
        setIsAuthenticated(true);
        setUser(foundUser); // Save authenticated user data
        return true;
      } else {
        setIsAuthenticated(false);
        setUser(null);
        return false; // Return false if authentication fails
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      console.error(error);
      return false;
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

export const useAuth = () => useContext(AuthContext);
