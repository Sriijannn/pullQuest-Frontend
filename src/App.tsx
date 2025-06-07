import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./auth/LoginPage";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoutes";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />

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

        {/* fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
