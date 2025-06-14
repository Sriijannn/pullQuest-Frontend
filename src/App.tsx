import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./auth/LoginPage";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoutes";
import Website from "./pages/Website";
import SignUp from "./auth/SignUp";
import { Toaster } from "./components/ui/sonner"; // ✅ Your custom Toaster wrapper
import MaintainerDashboard from "./pages/MaintainerDashboard";
import CompanyDashboard from "./pages/CompanyDashborad";
const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Website />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/dashboard" element={<CompanyDashboard />} />

          <Route
            path="/contributor/dashboard"
            element={
              <PrivateRoute allowedRoles={["contributor"]}>
                <Dashboard role="Contributor" />
              </PrivateRoute>
            }
          />
          <Route
            path="/maintainer/dashboard"
            element={
              <PrivateRoute allowedRoles={["maintainer"]}>
                <MaintainerDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/company/dashboard"
            element={
              <PrivateRoute allowedRoles={["company"]}>
                <CompanyDashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
};

export default App;
