/**
 * Virtual Gurukul - React Auth Context
 * Coordinates cloud Express API endpoints login/registration,
 * with automatic simulated local storage failover.
 */

import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("vg_token") || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token exists, verify with server
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await fetch("/api/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const data = await res.json();
          if (data.success) {
            setUser(data.user);
          } else {
            // Token invalid or server offline
            logout();
          }
        } catch (e) {
          console.warn("Express connection suspended. Accessing simulated DB node.");
          // Attempt client failover
          const localUser = localStorage.getItem("virtual_gurukul_current_user");
          if (localUser) setUser(JSON.parse(localUser));
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, [token]);

  const login = async (username, password) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("vg_token", data.token);
        setToken(data.token);
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (e) {
      // Offline Simulated Database Failover
      console.warn("API Offline. Performing Local Storage Login.");
      try {
        const localUsers = JSON.parse(localStorage.getItem("virtual_gurukul_users") || "[]");
        const found = localUsers.find(u => u.username === username && u.password === password);
        if (found) {
          localStorage.setItem("virtual_gurukul_current_user", JSON.stringify(found));
          setUser(found);
          return { success: true };
        } else {
          return { success: false, message: "Invalid credentials on Local storage profile." };
        }
      } catch (err) {
        return { success: false, message: "No local records compiled yet." };
      }
    }
  };

  const register = async (fullName, username, email, password, role) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, username, email, password, role })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("vg_token", data.token);
        setToken(data.token);
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (e) {
      // Offline Registration Failover
      console.warn("API Offline. Performing Local Storage registration.");
      const localUsers = JSON.parse(localStorage.getItem("virtual_gurukul_users") || "[]");
      if (localUsers.find(u => u.username === username || u.email === email)) {
        return { success: false, message: "Username already enrolled in client storage." };
      }

      const newUser = {
        id: "usr_" + Math.random().toString(36).substring(2, 9),
        fullName, username, email, password, role,
        avatar: role === "guru" ? "🧘" : "🕉️",
        xp: 100, streak: 1, lastLogin: new Date().toISOString(),
        badges: ["veda_novice"], enrolledCourses: []
      };

      localUsers.push(newUser);
      localStorage.setItem("virtual_gurukul_users", JSON.stringify(localUsers));
      localStorage.setItem("virtual_gurukul_current_user", JSON.stringify(newUser));
      setUser(newUser);
      return { success: true };
    }
  };

  const logout = () => {
    localStorage.removeItem("vg_token");
    localStorage.removeItem("virtual_gurukul_current_user");
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
