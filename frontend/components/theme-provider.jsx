"use client"

import { createContext, useContext, useEffect, useState } from "react"

const ThemeProviderContext = createContext({
  theme: "light",
  setTheme: (theme) => {},
})

export function ThemeProvider({ children, defaultTheme = "system", storageKey = "travelgo-theme", ...props }) {
  const [theme, setTheme] = useState(defaultTheme)

  useEffect(() => {
    const root = window.document.documentElement
    const savedTheme = localStorage.getItem(storageKey)

    if (savedTheme) {
      setTheme(savedTheme)
      root.classList.remove("light", "dark")
      root.classList.add(savedTheme)
    } else {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      setTheme(systemTheme)
      root.classList.remove("light", "dark")
      root.classList.add(systemTheme)
    }
  }, [storageKey])

  const value = {
    theme,
    setTheme: (newTheme) => {
      localStorage.setItem(storageKey, newTheme)
      const root = window.document.documentElement
      root.classList.remove("light", "dark")
      root.classList.add(newTheme)
      setTheme(newTheme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
