import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

// Base API URL — update with your deployed backend URL before going live
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [token,   setToken]   = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on app load
  useEffect(() => {
    const savedToken = localStorage.getItem("admin_token");
    const savedUser  = localStorage.getItem("admin_user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  // Login — calls /api/auth/login and stores token
  async function login(email, password) {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error ?? "Login failed");

    setToken(data.token);
    setUser(data.user);

    // Persist session
    localStorage.setItem("admin_token", data.token);
    localStorage.setItem("admin_user", JSON.stringify(data.user));

    return data.user;
  }

  // Logout — clears state and localStorage
  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
  }

  // Authenticated fetch helper — attaches Bearer token to every request
  async function authFetch(path, options = {}) {
    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    // Auto logout on 401
    if (res.status === 401) {
      logout();
      throw new Error("Session expired. Please log in again.");
    }

    return res;
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, authFetch }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for consuming auth context
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}