import { createContext } from "react";
import { User } from "../types/User";
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  userAcount: () => void;
  hasRole: (roles: string[]) => boolean;
  hasPermission: (permissions: string[]) => boolean;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {
    console.log("Sin cargar contexto");
    localStorage.removeItem("token");
  },
  logout: () => {},
  userAcount: () => {},
  hasRole: () => false,
  hasPermission: () => false,
  loading: false,
});
