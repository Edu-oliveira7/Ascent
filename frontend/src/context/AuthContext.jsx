import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem("access") || null
  );

  function login(access) {
    localStorage.setItem("access", access);
    setToken(access);
  }

  function logout() {
    localStorage.removeItem("access");
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}