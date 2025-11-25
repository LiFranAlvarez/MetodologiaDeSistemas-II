import { createContext, useState, useEffect, ReactNode } from "react";
import { AuthContextType, JwtPayload } from "../types/authContextoType";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null>(null);

// pequeño decodificador JWT (no valida firma)
const decodeJwt = (token: string): JwtPayload | null => {
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded) as JwtPayload;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const isAuthenticated = !!token;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      const decoded = decodeJwt(storedToken);
      if (decoded) setUser(decoded);
    }
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    const decoded = decodeJwt(newToken);
    if (decoded) {
      setUser(decoded);
      localStorage.setItem('userId', decoded._id);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
