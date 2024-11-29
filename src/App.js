import React, { useEffect } from "react";
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
import FilterBar from "./pages/user/AListening/components/FilterBar/FilterBar";
import CreateListeningTestPage from "./pages/user/CreateListeningTestPage";
import CreateReadingTestPage from "./pages/user/CreateReadingTestPage";
import AdminPage from "./pages/admin/AdminPage";
import AdminStatistics from "./pages/admin/AdminStatistics";
import AdminTest from "./pages/admin/AdminTest";
import AdminUser from "./pages/admin/AdminUser";
import AListening from "./pages/user/AListening/AListening"
import ForgotPassword from "./pages/ForgotPassword";
import accountApi from "./api/accountApi";
import Verification from "./pages/Verification";
import _FVerification from "./pages/_FVerification"
import _FEnterPassword from "./pages/_FEnterPassword"


const App = () => {  
  return (
    <AuthProvider>
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

const RoutesWrapper = () => {
  const { user } = useAuth(); // Access the logged-in user's data

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/signup/verify" element={<Verification/>} />
      <Route path="/verify" element={<_FVerification/>} />
      <Route path="/enterPassword" element={<_FEnterPassword/>} />


      {/* Protected Routes for user */}
      {user?.role === "learner" && (
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
            path="/listening"
            element={
              <ProtectedRoute>
                <AListening/>
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
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        >
          <Route path="statistics" element={<AdminStatistics />} />
          <Route path="test" element={<AdminTest />} />
          <Route path="user" element={<AdminUser />} />
        </Route>
      )}

      {/* Fallback for unmatched routes */}
      <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
    </Routes>
  );
};

export default App;
