import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const VALID_USERS = [
  { role: "admin", email: "admin@gmail.com", password: "admin1234" },
  { role: "customer", email: "customer@gmail.com", password: "customer1234" },
];

const AUTH_KEY = "evalAuth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      setUser(null);
    }
  }, []);

  const login = (email, password) => {
    const found = VALID_USERS.find(
      (u) => u.email === email.trim() && u.password === password
    );
    if (!found) return { ok: false, message: "Invalid email or password." };

    const payload = { role: found.role, email: found.email };
    setUser(payload);
    localStorage.setItem(AUTH_KEY, JSON.stringify(payload));
    return { ok: true, role: found.role };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
