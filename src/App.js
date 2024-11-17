import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth, AuthProvider } from "./context/AuthContext"; 
import ProtectedRoute from "./routes/ProtectedRoute";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import MainContent from "./components/MainContent/MainContent";
import ExercisePage from "./pages/user/ExercisePage";
import StatisticPage from "./pages/user/StatisticPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import CreateListeningTestPage from "./pages/CreateListeningTestPage";
import CreateReadingTestPage from "./pages/user/CreateReadingTestPage";
import AdminPage from "./pages/admin/AdminPage";

const App = () => {
  return (
    <AuthProvider> {/* AuthProvider wraps the entire app */}
      <Router>
        <div className="app">
          {/* Common Header and Navbar */}
          <Header />
          <Navbar />
          <RoutesWrapper />
        </div>
      </Router>
    </AuthProvider>
  );
};

/**
 * Separate the Routes logic to ensure `useAuth` is used only after AuthProvider is initialized.
 */
const RoutesWrapper = () => {
  const { user } = useAuth(); // Access the logged-in user's data

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected Routes for user */}
      {user?.role === "user" && (
        <>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainContent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exercise"
            element={
              <ProtectedRoute>
                <ExercisePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/statistic"
            element={
              <ProtectedRoute>
                <StatisticPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exercise/create-listening-test"
            element={
              <ProtectedRoute>
                <CreateListeningTestPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exercise/create-reading-test"
            element={
              <ProtectedRoute>
                <CreateReadingTestPage />
              </ProtectedRoute>
            }
          />
        </>
      )}

      {/* Protected Routes for admin */}
      {user?.role === "admin" && (
        <>
         <Route
            path="/admin/statistics"
            element={
              <ProtectedRoute>
                <AdminStatistics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/test"
            element={
              <ProtectedRoute>
                <AdminTest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user"
            element={
              <ProtectedRoute>
                <AdminUser />
              </ProtectedRoute>
            }
          />
        </>
        
        
      )}
      <Route path="*" element={<Navigate to="/login" />} />

    </Routes>
  );
};

export default App;
