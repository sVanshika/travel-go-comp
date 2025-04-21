"use client"

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// Logout function
const logout = async () => {
  setLoading(true)

  try {
    // In a real app, this would call the API
    // await authService.logout()

    // Remove all user data from localStorage
    localStorage.removeItem("travelgo_user")
    localStorage.removeItem("user_id")

    setUser(null)
  } catch (err) {
    console.error("Logout failed:", err)
  } finally {
    setLoading(false)
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [itinerary, setItinerary] = useState(null);

  const value = {
    user,
    setUser,
    itinerary,
    setItinerary
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 

