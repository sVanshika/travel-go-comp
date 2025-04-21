"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Create the auth context
const AuthContext = createContext(null)

// Auth provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [itinerary, setItinerary] = useState(null); // 🔥 new state for itinerary


  // Check if user is logged in on initial load
  useEffect(() => {
    // In a real app, this would check for a token in localStorage
    // and validate it with the server
    const checkAuth = async () => {
      try {
        // Mock authentication check
        const storedUser = localStorage.getItem("travelgo_user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (err) {
        console.error("Auth check failed:", err)
        setError("Failed to authenticate")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (email, password) => {
    setLoading(true)
    setError(null)

    try {
      // In a real app, this would call the API
      // const response = await authService.login(email, password)

      // Mock successful login
      const mockUser = {
        id: "123",
        name: "Rahul Sharma",
        email,
      }

      // Store user in localStorage
      localStorage.setItem("travelgo_user", JSON.stringify(mockUser))

      setUser(mockUser)
      return mockUser
    } catch (err) {
      console.error("Login failed:", err)
      setError("Invalid email or password")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Signup function
  const signup = async (name, email, password) => {
    setLoading(true)
    setError(null)

    try {
      // In a real app, this would call the API
      // const response = await authService.signup(name, email, password)

      // Mock successful signup
      const mockUser = {
        id: "123",
        name,
        email,
      }

      // Store user in localStorage
      localStorage.setItem("travelgo_user", JSON.stringify(mockUser))

      setUser(mockUser)
      return mockUser
    } catch (err) {
      console.error("Signup failed:", err)
      setError("Failed to create account")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const logout = async () => {
    setLoading(true)

    try {
      // In a real app, this would call the API
      // await authService.logout()

      // Remove user from localStorage
      localStorage.removeItem("travelgo_user")

      setUser(null)
    } catch (err) {
      console.error("Logout failed:", err)
    } finally {
      setLoading(false)
    }
  }

  // Context value
  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}
