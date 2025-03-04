import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./layouts/Navbar";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import AuthProvider from "./AuthProvider/AuthProvider";
import ProtectedRoute from "./AuthProvider/ProtectedRoute";
import Unathorized from "./pages/errors/Unauthorized";
import NotFound from "./pages/errors/NotFound";
import Dashboard from "./pages/Dashboard";
import RoutesApp from "./routes/RoutesApp";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/unauthorized" element={<Unathorized />} />
          <Route path="*" element={<NotFound />} />
          {RoutesApp()}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
