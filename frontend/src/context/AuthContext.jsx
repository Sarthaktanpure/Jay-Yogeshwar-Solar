import { createContext, useContext, useEffect, useState } from "react";
import api, { setAuthToken } from "../lib/api";

const AuthContext = createContext(null);
const STORAGE_KEY = "jys_auth";

function readStoredSession() {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return { token: "", user: null };
  }

  try {
    return JSON.parse(raw);
  } catch {
    return { token: "", user: null };
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => readStoredSession());
  const [loading, setLoading] = useState(Boolean(readStoredSession().token));

  useEffect(() => {
    setAuthToken(session.token);
    if (session.token) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      return;
    }

    window.localStorage.removeItem(STORAGE_KEY);
  }, [session]);

  useEffect(() => {
    async function hydrateUser() {
      if (!session.token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get("/auth/me");
        setSession((current) => ({ ...current, user: data.user }));
      } catch {
        setSession({ token: "", user: null });
      } finally {
        setLoading(false);
      }
    }

    hydrateUser();
  }, [session.token]);

  async function login(payload) {
    const { data } = await api.post("/auth/login", payload);
    setSession({ token: data.token, user: data.user });
    return data.user;
  }

  async function register(payload) {
    const { data } = await api.post("/auth/register", payload);
    setSession({ token: data.token, user: data.user });
    return data.user;
  }

  function logout() {
    setSession({ token: "", user: null });
  }

  return (
    <AuthContext.Provider
      value={{
        token: session.token,
        user: session.user,
        loading,
        isAuthenticated: Boolean(session.token && session.user),
        isAdmin: session.user?.role === "admin",
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
