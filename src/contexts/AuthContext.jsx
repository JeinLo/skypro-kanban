import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth") === "true");
  const [token, setToken] = useState(localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")).user?.token || JSON.parse(localStorage.getItem("userInfo")).token : null);

  useEffect(() => {
    localStorage.setItem("isAuth", String(isAuth));
  }, [isAuth]);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};