import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth, AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainContent from "./components/MainContent/MainContent";
import ExercisePage from "./pages/user/ExercisePage.tsx";
import StatisticPage from "./pages/user/StatisticPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import CreateListeningTestPage from "./pages/user/CreateListeningTestPage";
import CreateReadingTestPage from "./pages/user/CreateReadingTestPage";
import AdminPage from "./pages/admin/AdminPage";
import AdminStatistics from "./pages/admin/AdminStatistics";
import AdminTest from "./pages/admin/AdminTest";
import AdminUser from "./pages/admin/AdminUser";
import ForgotPassword from "./pages/ForgotPassword";
import Verification from "./pages/Verification";
import FEnterPassword from "./pages/FEnterPassword";
import FVerification from "./pages/FVerification";
import AddTestPage from "./pages/admin/AdminTest";
import AdminAddTest from "./pages/admin/AdminAdd";
import AdminAddS from "./pages/admin/AdminAddS";
import AdminAddR from "./pages/admin/AdminAddR";
import Profile from "./pages/Profile";
import StartTestPage from "./pages/user/StartTestPage.tsx";
import MainLayout from "./layout/MainLayout.tsx";
import ResultPage from "./pages/user/ResultPage.tsx";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <RoutesWrapper />
        </div>
      </Router>
    </AuthProvider>
  );
};

const RoutesWrapper = () => {
  const { user, loading } = useAuth(); // Access loading state

  if (loading) {
    // Show a loading spinner or placeholder
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <MainLayout>
            <LoginPage />
          </MainLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <MainLayout>
            <SignupPage />
          </MainLayout>
        }
      />
      <Route
        path="/forgot"
        element={
          <MainLayout>
            <ForgotPassword />
          </MainLayout>
        }
      />
      <Route
        path="/signup/verify"
        element={
          <MainLayout>
            <Verification />
          </MainLayout>
        }
      />
      <Route
        path="/verify"
        element={
          <MainLayout>
            <FVerification />
          </MainLayout>
        }
      />
      <Route
        path="/enterPassword"
        element={
          <MainLayout>
            <FEnterPassword />
          </MainLayout>
        }
      />
      <Route path="/admin-add-test" element={<AdminAddTest />} />
      <Route path="/admin-add-test/admin-add-section" element={<AdminAddS />} />
      <Route
        path="/admin-add-test/admin-add-sectionR"
        element={<AdminAddR />}
      />

      {/* Protected Routes for user */}
      {user?.role === "learner" && (
        <>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <MainContent />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exercise"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <ExercisePage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/statistic"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <StatisticPage />
                </MainLayout>
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
          <Route path="/start-test" element={<StartTestPage></StartTestPage>} />
          <Route
            path="/result"
            element={
              <MainLayout>
                <ResultPage />
              </MainLayout>
            }
          ></Route>
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
          <Route path="/admin-add-test" element={<AddTestPage />} />
          <Route
            path="/admin-add-test/admin-add-section"
            element={<AdminAddS />}
          />
          <Route
            path="/admin-add-test/admin-add-sectionR"
            element={<AdminAddR />}
          />
        </Route>
      )}

      {/* Fallback for unmatched routes */}
      <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
    </Routes>
  );
};

export default App;
