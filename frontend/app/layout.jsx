import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "./context/auth-context"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "TravelGo - AI-Powered Travel Planning",
  description: "Plan your perfect trip with AI-driven itineraries, packing lists, and travel recommendations.",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}


import './globals.css'