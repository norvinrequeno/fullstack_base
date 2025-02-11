import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axiosInstance from "../config/axios.config";
import { useNavigate } from "react-router-dom";
import { User } from "../types/User";
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("token");
      const usr = localStorage.getItem("user");

      if (token && token != null && usr && usr != null) {
        try {
          setUser(JSON.parse(usr));
        } catch (err) {
          console.log(err);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
      setLoading(false);
    };
    getUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, status } = await axiosInstance.post("login", {
        email,
        password,
      });
      if (status == 200 && data.token && data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("logout");
    } catch (error) {
      console.error(error);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const userAcount = async () => {
    const { data } = await axiosInstance.get("user");
    setUser(data);
  };

  const hasRole = (roles: string[]) =>
    user ? roles.some((r) => user.roles.includes(r)) : false;
  const hasPermission = (permissions: string[]) =>
    user ? permissions.some((r) => user.permissions.includes(r)) : false;
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        userAcount,
        hasRole,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
