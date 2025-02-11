import { useState } from "react";
import { Link } from "react-router-dom";

import useAuth from "../AuthProvider/useAuth";

export default function Navbar() {
  const { user, logout, userAcount, hasRole, hasPermission } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <nav className="bg-blue-600 text-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold">
              Dashboard
            </Link>
          </div>

          {!user ? (
            <div className="hidden md:flex space-x-4">
              <Link
                to="/login"
                className="hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                Registrarme
              </Link>
            </div>
          ) : (
            <div className="relative">
              {hasRole(["superAdmin"]) && (
                <button className="flex items-center gap-2 hover:bg-blue-500 px-4 py-2 rounded-md text-sm font-medium focus:outline-none">
                  Control usuarios
                </button>
              )}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 hover:bg-blue-500 px-4 py-2 rounded-md text-sm font-medium focus:outline-none"
              >
                {user.name}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-700 rounded-md shadow-lg py-2 z-50">
                  <Link
                    to="/change-password"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Cambiar contraseña
                  </Link>
                  {hasPermission(["admin-users"]) && (
                    <button
                      onClick={userAcount}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Mi usuario
                    </button>
                  )}
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Salir
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
