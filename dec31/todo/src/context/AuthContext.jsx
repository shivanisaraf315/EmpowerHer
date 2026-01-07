import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { clearAuth, loadAuth, saveAuth } from "../utils/storage";
import { loginService, signupService, lookupService } from "../services/auth.service";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => loadAuth());
  const [loading, setLoading] = useState(true);

  const user = session
    ? { uid: session.uid, email: session.email }
    : null;

  const isAuthenticated = Boolean(session?.idToken && session?.uid);

  useEffect(() => {
    // Restore session on refresh and validate token if still valid
    async function restore() {
      try {
        const s = loadAuth();
        if (!s?.idToken) {
          setSession(null);
          return;
        }

        const expired = Date.now() >= Number(s.expiresAt || 0);
        if (expired) {
          clearAuth();
          setSession(null);
          return;
        }

        // Optional verification with lookup
        await lookupService(s.idToken);

        setSession(s);
      } catch {
        clearAuth();
        setSession(null);
      } finally {
        setLoading(false);
      }
    }

    restore();
  }, []);

  async function login(email, password) {
    const s = await loginService(email, password);
    saveAuth(s);
    setSession(s);
    return s;
  }

  async function signup(email, password) {
    const s = await signupService(email, password);
    saveAuth(s);
    setSession(s);
    return s;
  }

  function logout() {
    clearAuth();
    setSession(null);
  }

  const value = useMemo(
    () => ({
      loading,
      isAuthenticated,
      session,
      user,
      login,
      signup,
      logout,
    }),
    [loading, isAuthenticated, session, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
