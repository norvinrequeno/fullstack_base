import { createContext } from "react";
import { User } from "../Types";
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  userAccount: () => void;
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
  userAccount: () => {},
  hasRole: () => false,
  hasPermission: () => false,
  loading: false,
});
