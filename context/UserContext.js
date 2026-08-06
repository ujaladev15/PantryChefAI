import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// UI-only mock authentication. No backend calls are made -
// this simply simulates a session so the navigation flow feels real.

const UserContext = createContext(null);
const STORAGE_KEY = "@pantrychef_user";

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) setUser(JSON.parse(stored));
      } catch (e) {
        // ignore
      } finally {
        setCheckingAuth(false);
      }
    })();
  }, []);

  const login = useCallback(async ({ name, email, guest = false }) => {
    const mockUser = {
      name: name || (guest ? "Guest Chef" : "Alex Morgan"),
      email: email || (guest ? null : "alex.morgan@example.com"),
      guest,
      streak: 4,
      joined: "2025-11-02",
    };
    setUser(mockUser);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
    return mockUser;
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
    await AsyncStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({ user, login, logout, checkingAuth, isAuthenticated: !!user }),
    [user, login, logout, checkingAuth]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
}
