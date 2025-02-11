import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./layouts/Navbar";
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import AuthProvider from "./AuthProvider/AuthProvider";
import ProtectedRoute from "./AuthProvider/ProtectedRoute";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/users/list"
            element={
              <ProtectedRoute allowedPermissions={["admin_sys"]}>
                <p>Listado de usuarios</p>
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<h1>Dashboard</h1>} />
          <Route
            path="/unauthorized"
            element={
              <h1>No tiene autorización para acceder a esta funcionalidad</h1>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
