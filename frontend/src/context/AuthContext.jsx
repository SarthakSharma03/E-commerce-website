import { useMemo, useState } from "react";
import Api from "../service/Api";
import { AuthContext } from "./Contexts";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem("auth_token");
    } catch {
      return null;
    }
  });
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user_info");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

  const isAuthenticated = Boolean(token);

  const login = (nextToken, nextUser) => {
    setToken(nextToken);
    setUser(nextUser);

    try {
      localStorage.setItem("auth_token", nextToken);
      localStorage.setItem("user_info", JSON.stringify(nextUser));
    } catch (error) {
      console.warn("Auth storage write failed", error);
    }
  };

  const logout = async () => {
    try {
      await Api.logout();
    } catch {
    // 
    }

    setToken(null);
    setUser(null);

    try {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_info");
    } catch (error) {
      console.warn("Auth storage clear failed", error);
    }
  };

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated,
      login,
      logout,
      setUser,
    }),
    [token, user, isAuthenticated]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
