import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axios.config";
import axios from "axios";


export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && token != null) navigate("/");
  }, [token, navigate]);

  const register = async (name:string, email:string, password:string) => {
    const rs = await axiosInstance.post("register", { name, email, password });
    if (!rs.data.status) setError(rs.data.message);
    else setMessage(rs.data.message);
  };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError("Por favor, completa todos los campos.");
            return;
        } else if (password.length < 8) {
            setError("Su contraseña debe tener al menos 8 dígitos");
            return;
        }

        try {
            await register(name, email, password);
        } catch (err) {
            if (axios.isAxiosError(err) && err.response && err.response.status === 422) {
                const errorResponse = err.response.data;
                setError(errorResponse.error);
            } else setError("Ocurrió un error al registrar el usuario, intente mas tarde.")
        };
    }
        return (
            <div className="min-h-screen flex items-center justify-center  bg-green-100">
                <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                    <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        Regístrate
                    </h3>
                    {error && (
                        <p className="text-red-600 text-sm text-center mb-4">{error}</p>
                    )}

                    {message && (
                        <p className="text-green-600 text-sm text-center mb-4">{message}</p>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Nombre
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Ingresa tu nombre"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Ingresa tu correo electrónico"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Ingresa tu contraseña"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Registrarme
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

