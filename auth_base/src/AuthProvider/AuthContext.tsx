import { createContext } from "react";
interface AuthContextType{
    user: string;
    login: (email: string, password: string) => void;
    logout: () => void;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: "",
  login: async () => {},
  logout: () => {},
  loading: false,
});