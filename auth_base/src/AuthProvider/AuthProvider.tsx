import axios from "axios";
import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }:{children: React.ReactNode}) {
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("token");
      const usr = localStorage.getItem("user");

      if (token && token != null && usr && usr != null) {
        try {
          setUser(usr);
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

    const login = async (email:string, password:string) => {
    const rs = await axios.post("login", { email, password });
    localStorage.setItem("token", rs.data.access_token);
    localStorage.setItem("user", rs.data.name);
    setUser(rs.data.user.name);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser("");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
    
}