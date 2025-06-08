import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./auth/LoginPage";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoutes";
import Website from "./pages/Website"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Website/>} />

        {/* Your login page now lives at /login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected dashboards */}
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
              <Dashboard role="Maintainer" />
            </PrivateRoute>
          }
        />
        <Route
          path="/company/dashboard"
          element={
            <PrivateRoute allowedRoles={["company"]}>
              <Dashboard role="Company" />
            </PrivateRoute>
          }
        />

        {/* Anything else → back to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
