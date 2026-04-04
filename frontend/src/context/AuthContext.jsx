import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  
  const [token, setToken] = useState(
    localStorage.getItem("access") || null
  );
  
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  function login(access, userData) {
    localStorage.setItem("access", access);
    setToken(access);

    
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    }
  }

  function logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("user"); 
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}