import { useState } from "react";
import { Link } from "react-router-dom";

import useAuth from "../AuthProvider/useAuth";
import { MenuLinks } from "../routes/RouteStore";



export default function Navbar() {
  const { user, logout, userAcount, hasRole, hasPermission } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const menuLinks = MenuLinks;
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
              <div className="hidden md:flex space-x-4">
                {menuLinks.map((link, index) => (
                   ((!link.permiso && !link.roles) || (hasPermission(link.permiso ?? [])) || (hasRole(link.roles ?? []))) &&(
                  <Link
                    key={index}
                    to={link.href}
                    className="hover:bg-blue-500 px-2 py-2 rounded-md text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                )
                ))}
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="hover:bg-blue-500 px-2 py-2 rounded-md text-sm font-medium"
                >
                  {user.name}
                </button>
              </div>

              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white text-gray-700 rounded-md shadow-lg py-2 z-50"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
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
