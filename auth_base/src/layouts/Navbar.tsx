import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthContext";

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    return (
        <nav className="bg-blue-600 text-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
                <div className="flex-shrink-0">
                    <Link to="/" className="text-xl font-bold">
                        Tasks
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
                    <div className="hidden md:flex space-x-4">
                        <button
                            className="hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium"
                            onClick={logout}
                        >
                            Salir
                        </button>
                    </div>
                )}
            </div>
        </div>
    </nav>
    );
}