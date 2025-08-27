import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("auth_token") || null);
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("auth_user");
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("auth_token", token);
    } else {
      localStorage.removeItem("auth_token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("auth_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("auth_user");
    }
  }, [user]);

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(token),
      token,
      user,
      signIn: ({ email }) => {
        const fakeToken = Math.random().toString(36).slice(2);
        setToken(fakeToken);
        setUser({ email });
      },
      signUp: ({ name, email }) => {
        const fakeToken = Math.random().toString(36).slice(2);
        setToken(fakeToken);
        setUser({ name, email });
      },
      signOut: () => {
        setToken(null);
        setUser(null);
      },
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}


