"use client";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const login = (userData) => {
    setUser(userData);
    router.push("/");
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    router.push("/auth");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
