import { jwtDecode } from "jwt-decode";
import React, { createContext, useState, useContext, useEffect } from "react";
import authenApi from "../api/authenApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          console.log("Token expired");
          logout();
        } else {
          setIsAuthenticated(true);
          setUser({
            email: decoded.sub,
            role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
          });
        }
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    }
    setLoading(false); // Set loading to false once initialization is complete
  }, []);

  const login = async (email, password) => {
    try {
      const loginResponse = await authenApi.login(email, password);
      const accessToken = loginResponse.accessToken;
      const decoded = jwtDecode(accessToken);
      const foundUser = {
        email: decoded.sub,
        role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
        id: decoded.id,
      };

      setIsAuthenticated(true);
      setUser(foundUser);
      localStorage.setItem("authToken", loginResponse);

      return { success: true };
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("authToken");
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);